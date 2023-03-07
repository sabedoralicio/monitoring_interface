use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use crate::types::*;

///                                                                     
pub fn portnr_pid_map(port_nrs: Vec<PortNr>) -> HashMap<PortNr,PID> {
    let mut port_pid_map: HashMap<PortNr,PID> = HashMap::new();
    for port_nr in port_nrs {
        let pid = pid_at_port(&port_nr).unwrap();
        port_pid_map.insert(port_nr, pid);
    }
    port_pid_map
}

///
pub fn pid_at_port(port_nr: &PortNr) -> Option<PID> {
    let hex_port_nr: String = format!("{:X}", port_nr);
    let path = Path::new("/proc/net/tcp");
    let mut file = match File::open(&path) {
        Err(lore) => panic!("couldn't open /proc/net/tcp: {}", lore),
        Ok(file) => file
    };
    let mut code = String::new();
    match file.read_to_string(&mut code) {
        Err(lore) => panic!("couldn't read /proc/net/tcp: {}", lore),
        Ok(_) => ()
    }
    let lines: Vec<&str> = code.split('\n').collect::<Vec<&str>>().split_off(1);
    for line in lines {
        match port_nr_inode_find_in(line, &hex_port_nr) {
            None => {}
            Some(inode) => {
//                return Some(inode)
                let inode_pid_map: HashMap<Inode,PID> = inode_pid_map();
                return Some(inode_pid_map[&inode])
            }
        }
    }
    None
}

///
fn port_nr_inode_find_in(line: &str, port_nr: &str) -> Option<Inode> {
    let colon_chunks: Vec<&str> = line.split(':').collect();
    let port_nr_code: &str = colon_chunks[2].split(' ').collect::<Vec<&str>>()[0];
    if port_nr_code == port_nr {
        let split_off_len = 33;
        let inode_code_rest: String =
            String::from(colon_chunks[5]).split_off(split_off_len);
//        print!("inode_code_rest: »{}«\n", inode_code_rest);
        let inode_code: &str =
            inode_code_rest.split(' ').collect::<Vec<&str>>()[0];
//        print!("port {} inode_code: »{}«\n", port_nr, inode_code);
        let inode: Inode = usize::from_str_radix(inode_code,10).unwrap();
        Some(inode)
    } else {
        None
    }
}

///
pub fn inode_pid_map() -> HashMap<Inode,PID> {
    let mut inode_pid_map: HashMap<Inode,PID> = HashMap::new();
    let path = Path::new("/proc");
    for entry_result in path.read_dir().unwrap() {
        let entry = entry_result.unwrap();
        if entry.file_type().unwrap().is_dir() {
            let dir_name_raw = entry.file_name(); // rustc --explain E0716
            let dir_name: &str = dir_name_raw.to_str().unwrap();
            match usize::from_str_radix(dir_name, 10) {
                Ok(pid) => {
                    let pid_path_str = format!("/proc/{}/fdinfo", pid);
                    match fdinfo_max_inode(&pid_path_str) {
                        Some(inode) => {
                            inode_pid_map.insert(inode, pid);
                        }
                        None => {}
                    }
                }
                _ => {}
            }
        }
    }
    inode_pid_map
}

///
fn fdinfo_max_inode(path_str: &str) -> Option<Inode> {
    let path = Path::new(&path_str);
    let mut max_file_nr: i32 = -1;
    match path.read_dir() {
        Err(err) => {}
        Ok(entry_results) => {
            for entry_result in path.read_dir().unwrap() {
                let file_nr: i32 =
                    i32::from_str_radix(entry_result.unwrap().file_name().to_str().unwrap(),10).unwrap();
                max_file_nr = max_file_nr.max(file_nr);
            }
        }
    }
    if max_file_nr < 0 {
        None
    } else {
        let max_inode_path_str = format!("{}/{}", path_str, max_file_nr);
        fdinfo_inode(&max_inode_path_str)
    }
}

///
fn fdinfo_inode(path_str: &str) -> Option<Inode> {
    let path = Path::new(&path_str);
    match File::open(&path) {
        Err(_) => {
            None
        }
        Ok(mut file) => {
            let mut code = String::new();
            match file.read_to_string(&mut code) {
                Err(lore) => panic!("couldn't read {}: {}", path_str, lore),
                Ok(_) => ()
            }
            let lines: Vec<&str> = code.split('\n').collect();
            let inode_lore: Vec<&str> = lines[3].split(':').collect();
            assert_eq!("ino", inode_lore[0]);
            let inode: Inode = usize::from_str_radix(inode_lore[1].trim(), 10).unwrap();
            Some(inode)
        }
    }
}
