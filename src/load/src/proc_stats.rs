use std::fs::File;
use std::io::prelude::*;
use std::io::Result;
use std::path::Path;
use std::{thread, time::Duration};
use chrono::{Datelike, Timelike, Utc};
use crate::types::*;

///
pub fn load_stats_of_pids_json(timespan_ns: u64, pids: Vec<PID>) -> JSON {
    let now = Utc::now();
    let timestamp = format!("{}-{:02}-{:02} {:02}:{:02}:{:02}",
                            now.year(), now.month(), now.day(),
                            now.hour(), now.minute(), now.second());
    let load_stats: Vec<JSON> =
        pids.iter().map(|pid| json_proc_load(&load_stats_of_process(timespan_ns, pid)))
                   .collect();
    format!("{{ timestamp: {}, load_stats: [{}] }}", timestamp, load_stats.join(", "))
}

///
pub fn load_stats_of_pids(timespan_ns: u64, pids: Vec<PID>) -> Vec<ProcLoad> {
    return pids.iter().map(|pid| load_stats_of_process(timespan_ns, pid)).collect();
}

///
pub fn load_stats_of_process(timespan_ns: u64, pid_: &PID) -> ProcLoad {
    let timespan: Duration = Duration::from_nanos(timespan_ns);
    
    let whole_cpu_time_bef: CPUTime = get_total_cpu_time();
    let proc_t_bef: ProcLore = read_proc_pid(pid_).unwrap();
    thread::sleep(timespan);
    let whole_cpu_time_aft: CPUTime = get_total_cpu_time();
    let proc_t_aft: ProcLore = read_proc_pid(pid_).unwrap();
    let cpu_time: CPUTime = (proc_t_aft.utime + proc_t_aft.stime)
                          - (proc_t_bef.utime + proc_t_bef.stime);
//    print!("tid: {}\n", proc_t_aft.tid);
//    print!("cmd: {}\n", proc_t_aft.cmd);
//    print!("utime: {}\n", proc_t_aft.utime);
//    print!("stime: {}\n", proc_t_aft.stime);
//    print!("cpu_time: {}\n", cpu_time);
    let whole_cpu_time = whole_cpu_time_aft - whole_cpu_time_bef;
//    print!("whole_cpu_time: {}\n", whole_cpu_time);
    let count: usize = thread::available_parallelism().unwrap().get();
//    print!("count: {}\n", count);
    let cpu_load: CPULoad = 100.0 * (count as f32) * (cpu_time as f32) / (whole_cpu_time as f32);
    ProcLoad { pid: proc_t_aft.tid,
               cpu_load: cpu_load,
               mem_kb: proc_t_aft.vm_rss }
}

///
pub fn get_total_cpu_time() -> CPUTime {
    let path = Path::new("/proc/stat");
    let mut file = match File::open(&path) {
        Err(lore) => panic!("couldn't open /proc/stat: {}", lore),
        Ok(file) => file
    };
    let mut stats = String::new();
    match file.read_to_string(&mut stats) {
        Err(lore) => panic!("couldn't read /proc/stat: {}", lore),
        Ok(_) => ()
    }
//    print!("/proc/stat contains: {}\n", stats);
    let lines: Vec<&str> = stats.split('\n').collect();
//    print!("CPU stats: {}\n", lines[0]);
    let cpu_stats: Vec<&str> = lines[0].split(' ').collect();
    let user: CPUTime = usize::from_str_radix(cpu_stats[2],10).unwrap();
    let nice: CPUTime = usize::from_str_radix(cpu_stats[3],10).unwrap();
    let system: CPUTime = usize::from_str_radix(cpu_stats[4],10).unwrap();
    let idle: CPUTime = usize::from_str_radix(cpu_stats[5],10).unwrap();
    let iowait: CPUTime = usize::from_str_radix(cpu_stats[6],10).unwrap();
    let irq: CPUTime = usize::from_str_radix(cpu_stats[7],10).unwrap();
    let softirq: CPUTime = usize::from_str_radix(cpu_stats[8],10).unwrap();
    let steal: CPUTime = usize::from_str_radix(cpu_stats[9],10).unwrap();
/*
    print!("user: {}\n", user);
    print!("nice: {}\n", nice);
    print!("system: {}\n", system);
    print!("idle: {}\n", idle);
    print!("iowait: {}\n", iowait);
    print!("irq: {}\n", irq);
    print!("softirq: {}\n", softirq);
    print!("steal: {}\n", steal);
// */
    let cpu_time: CPUTime = user + nice + system + idle + iowait + irq + softirq + steal;
    cpu_time
}

/// 
pub fn read_proc_pid(pid: &PID) -> Result<ProcLore> {
    let path_str = format!("/proc/{}/stat", pid);
    let path = Path::new(&path_str);
    let mut file = match File::open(&path) {
        Err(lore) => panic!("couldn't open {}: {}", path_str, lore),
        Ok(file) => file
    };
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(lore) => panic!("couldn't read {}: {}", path_str, lore),
        Ok(_) => ()
    }
//    print!("{} contains: {}\n", path_str, s);
    let lores: Vec<&str> = s.split(' ').collect();
    let tid_: PID = usize::from_str_radix(lores[0],10).unwrap();
    let cmd_: String =
        String::from(lores[1].trim_start_matches('(').trim_end_matches(')'));
    let utime_: CPUTime = usize::from_str_radix(lores[13],10).unwrap();
    let stime_: CPUTime = usize::from_str_radix(lores[14],10).unwrap();
    let vm_rss_: MemKB =
        usize::from_str_radix(lores[23],10).unwrap() * page_size::get() / 1024;
    Ok(ProcLore { tid: tid_
                , cmd: cmd_
                , utime: utime_
                , stime: stime_
                , vm_rss: vm_rss_ })
}

