/** TODO: Lots of problems seemingly are caused by asynchronous processing.
 */
import { useProcLoadTakerStore,
		 useMPIBufLoadTakerStore,
		 useSpikeCountLoadTakerStore } from '@/store/load';
import { ProcLoadLore,
	     MPIBufLoadLore,
	     SpikeCountLoadLore } from '@/ts/TypesForViews';
import { useGridClickStore } from '@/store/clickGrid';
import { getCurrentInstance, defineComponent } from 'vue'

const MEASUREMENT_INTERVAL_MS:number = 5000;
const INSITE_ACCESS_NODE_URL:string = 'http://127.0.0.1:8080';

/** Whole measurement update loop
 * TODO: emulation code to enter here??
 */
export function runLoop() {
	let MEASUREMENT_INTERVAL_MS:number = 5000;
	setInterval(() => {
		const instance = getCurrentInstance();
		instance?.proxy?.$forceUpdate();
		loadTaking()
	}, MEASUREMENT_INTERVAL_MS)
}

/** Whole measurement taking round:
 */
export function loadTaking() {
	let procLoadLoreUrl: string =
		INSITE_ACCESS_NODE_URL+'/loadLore/';
	let mpiBufLoadLoreUrl: string =
		INSITE_ACCESS_NODE_URL+'/nest/ringBufferSize/';
	let spikesCountLoadLoreUrl: string =
		INSITE_ACCESS_NODE_URL+'/nest/spikeCountForLast/?duration=1000';
	fetch(procLoadLoreUrl)
		.then((response) => response.json())
		.then((lore) => procLoadAdd(lore));
	fetch(mpiBufLoadLoreUrl)
		.then((response) => response.json())
		.then((lore) => mpiBufLoadAdd(lore));
	fetch(spikesCountLoadLoreUrl)
		.then((response) => response.json())
		.then((lore) => spikeCountLoadAdd(lore));
	useGridClickStore().update();
}

/** Filling in of CPU% / memory load measurement from /proc/:
 */
function procLoadAdd(lore: ProcLoadLore) {
	let secsFromEpoch: number = lore.secsFromEpoch;
	for (let node of lore.loadLoreNodes) {
		useProcLoadTakerStore().takeLoad([secsFromEpoch, node.portNr],
										 [node.cpuPercent, node.memKb]);
	}
}

/** Filling in of one MPI buffer size measurement:
 */
function mpiBufLoadAdd(lore: MPIBufLoadLore) {
	for (let node of lore.mpiBufferSizeNodes) {
		useMPIBufLoadTakerStore().takeLoad([node.secsSinceEpoch, node.portNr],
										   node.mpiBufferSize);
	}
}

/** Filling in of one spike count per process measurement:
 */
function spikeCountLoadAdd(lore: SpikeCountLoadLore) {
	for (let node of lore.spikeCountNodes) {
		if(node.spikeCount >= 0){
			useSpikeCountLoadTakerStore().takeLoad([node.secsSinceEpoch, node.portNr],
												   node.spikeCount);
		}
	}
}
