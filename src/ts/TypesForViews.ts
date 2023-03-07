
export enum MeasureKind {
	CPULoad = 'CPU %',
	MemLoad = 'Mem kB',
	RingBuffer = 'MPI Buffer',
	SpikesPerProcess = 'Spikes/Process'
}

export interface NodeProcLoadLore {
  portNr: number;
  pid: number;
  cpuPercent: number;
  memKb: number;
}

export interface ProcLoadLore {
  secsFromEpoch: number;
  loadLoreNodes: NodeProcLoadLore[];
}

export interface NodeProcLoadLore {
  portNr: number;
  pid: number;
  cpuPercent: number;
  memKb: number;
}

export interface MPIBufLoadLore {
  callTime: number;
  mpiBufferSizeNodes: NodeMPIBufLoadLore[];
}

export interface NodeMPIBufLoadLore {
  portNr: number;
  secsSinceEpoch: number;
  mpiBufferSize: number;
}

export interface SpikeCountLoadLore {
  callTime: number;
  spikeCountNodes: NodeSpikeCountLoadLore[];
}

export interface NodeSpikeCountLoadLore {
  portNr: number;
  secsSinceEpoch: number;
  spikeCount: number;
}
