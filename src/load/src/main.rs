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
    if args.len() < 2 { usage(); }
    else {
        match (args[1].as_str(),args.len()) {
            ("pids",3) => {
                let port_nr_codes: Vec<&str> = args[2].split(',').collect();
                let port_nrs: Vec<PortNr> =
                    port_nr_codes.iter().map(|s| u32::from_str_radix(s,10).unwrap()).collect();
                let pid_map: HashMap<PortNr,PID> = portnr_pid_map(port_nrs);
//                println!("[{}]", portnr_pid_map_json(pid_map));
                println!("{}", portnr_pid_map_code(pid_map));
            }
            ("loads",4) => {
                let timespan_ns: u64 = u64::from_str_radix(&args[2],10).unwrap();
                let pid_codes: Vec<&str> = args[3].split(',').collect();
                let port_pids: Vec<(PortNr,PID)> =
                    pid_codes.iter().map(|s| port_pid_of(s)).collect();
                let json = load_stats_of_port_pids_code(timespan_ns, port_pids);
                println!("{}", json);
            }
            _ => { usage(); }
        }
    }
}

///
fn port_pid_of(code: &str) -> (PortNr,PID) {
    let tokens: Vec<&str> = code.split(':').collect();
    let port: PortNr = u32::from_str_radix(tokens[0],10).unwrap();
    let pid: PID = usize::from_str_radix(tokens[1],10).unwrap();
    (port,pid)
}

///
fn usage() {
    println!("USAGE:");
    println!("proc-lore pids <PORT_NR COMMA SEPARATED>");
    println!("proc-lore loads <TIMEPAN NS> <PORT_NR:PID COMMA SEPARATED>");
}

///
fn portnr_pid_map_code(portnr_pid_map: HashMap<PortNr,PID>) -> JSON {
    let codes: Vec<JSON> =
        portnr_pid_map.iter().map(|(port,pid)| format!("{}:{}", port, pid)).collect();
    codes.join(",")
}

///
fn portnr_pid_map_json(portnr_pid_map: HashMap<PortNr,PID>) -> JSON {
    let jsons: Vec<JSON> =
        portnr_pid_map.iter().map(|(port,pid)| format!("{{ port: {}, pid: {} }}", port, pid)).collect();
    jsons.join(", ")
}
