/** This could be understood as the heart of the tool's model.
 * 
 */
import { defineStore } from 'pinia';

// usage-friendly time stamp
type SecsFromEpoch = number;

// here only localhost single process backends so far
type Port = number;

// CPU load in % of one CPU thread
type CPUPerc = number;

// memory usage in kB
type MemKB = number;

// Key type of a load measurement
type Take = [SecsFromEpoch, Port];

// CPU / mem load value pair from /proc/
type ProcLoad = [CPUPerc, MemKB];

// size of mpibuffers
type MPIBufSize = number;

// spike count
type SpikeCount = number;


/* Access to load lore coming from /proc/.
 */
export const useProcLoadTakerStore = defineStore('procLoadTaker', {
	state: () => ({
		loadTake: new Map<Take, ProcLoad>()
	}),
	actions: {
		/** Filling in of one node-time load pair:
         */
		takeLoad(take: Take, load: ProcLoad) {
			this.loadTake.set(take, load)
		},
	},
});

/* Access to load lore coming from mpibuffer sizes.
 */
export const useMPIBufLoadTakerStore = defineStore('mpiBufLoadTaker', {
	state: () => ({
		loadTake: new Map<Take, MPIBufSize>()
	}),
	actions: {
		/** Filling in of one node-time load pair:
         */
		takeLoad(take: Take, load: MPIBufSize) {
			this.loadTake.set(take, load)
		},
	},
});

/* Access to load lore coming from spike counts.
 */
export const useSpikeCountLoadTakerStore = defineStore('spikeCountLoadTaker', {
	state: () => ({
		loadTake: new Map<Take, SpikeCount>()
	}),
	actions: {
		/** Filling in of one node-time load pair:
         */
		takeLoad(take: Take, load: SpikeCount) {
			this.loadTake.set(take, load)
		},
	},
});
