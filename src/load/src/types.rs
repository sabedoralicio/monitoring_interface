
///
pub type PID = usize;
pub type Inode = usize;
pub type PortNr = usize;
pub type MemKB = usize;
pub type CPUTime = usize;
pub type CPULoad = f32;
pub type JSON = String;

/// process load
pub struct ProcLoad {
    pub pid: PID, 
    pub cpu_load: CPULoad,             
    pub mem_kb: MemKB   
}

pub fn json_proc_load(proc_load: &ProcLoad) -> JSON {
    format!("{{ pid: {}, cpu_load: {}, mem_kb: {} }}",
//    format!("{{ cpu_load: {}, mem_kb: {} }}",
            proc_load.pid,
            proc_load.cpu_load,
            proc_load.mem_kb)
}

/// process lore
pub struct ProcLore {
    pub tid: PID,       // task id
    pub cmd: String,    // name
    pub utime: CPUTime, // time in user mode
    pub stime: CPUTime, // time in kernel mode
    pub vm_rss: MemKB   // resident set size (in kB)
}
