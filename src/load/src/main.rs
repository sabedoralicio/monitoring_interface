/// TODO docker
mod portnr_pid;
mod proc_stats;
mod types;
use std::collections::HashMap;
use crate::portnr_pid::*;
use crate::proc_stats::*;
use crate::types::*;

///
fn main() {
    let args: Vec<String> = std::env::args().collect();
    match (args[1].as_str(),args.len()) {
        ("pids",3) => {
            let port_nr_codes: Vec<&str> = args[2].split(',').collect();
            let port_nrs: Vec<PortNr> =
                port_nr_codes.iter().map(|s| usize::from_str_radix(s,10).unwrap()).collect();
            let pid_map: HashMap<PortNr,PID> = portnr_pid_map(port_nrs);
            println!("[{}]", portnr_pid_map_json(pid_map));
        }
        ("loads",4) => {
            let timespan_ns: u64 = u64::from_str_radix(&args[2],10).unwrap();
            let pid_codes: Vec<&str> = args[3].split(',').collect();
            let pids: Vec<PID> =
                pid_codes.iter().map(|s| usize::from_str_radix(s,10).unwrap()).collect();
            let json = load_stats_of_pids_json(timespan_ns, pids);
            println!("{}", json);
        }
        _ => {
            println!("USAGE:");
            println!("proc-lore pids <PORT NRS COMMA SEPARATED>");
            println!("proc-lore loads <TIMEPAN NS> <PIDS COMMA SEPARATED>");
        }
    }
}

///
fn portnr_pid_map_json(portnr_pid_map: HashMap<PortNr,PID>) -> JSON {
    let jsons: Vec<JSON> =
        portnr_pid_map.iter().map(|(port,pid)| format!("{{ port: {}, pid: {} }}", port, pid)).collect();
    jsons.join(", ")
}
