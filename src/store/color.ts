/** Global state for colors of strokes in various meters; practically,
 * it is a palette. 
 * TODO: Outsourcing to some kind of configurable spec.
 * TODO: With up to 256+ nodes, it makes sense to either use a floating
 *       set assigned to chosen lore, or using generators.
 */
import { defineStore } from 'pinia';

export const useStrokeColorStore = defineStore('strokeColor', {
	state: () => ({
		strokeColor:  new Map<string, Map<number,string>>([
			['cpu', new Map<number,string>([
				[0, '#7f0000'],
				[1, '#ff0000'],
				[2, '#007f00'],
				[3, '#00ff00'],
				[4, '#7f0000'],
				[5, '#ff0000'],
				[6, '#007f00'],
				[7, '#00ff00'],
				[8, '#7f0000'],
				[9, '#ff0000'],
				[10, '#007f00'],
				[11, '#00ff00'],
				[12, '#7f0000'],
				[13, '#ff0000'],
				[14, '#007f00'],
				[15, '#00ff00']])],
			['mem', new Map<number,string>([
				[0, '#00007f'],
				[1, '#0000ff'],
				[2, '#7f007f'],
				[3, '#ff00ff'],
				[4, '#00007f'],
				[5, '#0000ff'],
				[6, '#7f007f'],
				[7, '#ff00ff'],
				[8, '#00007f'],
				[9, '#0000ff'],
				[10, '#7f007f'],
				[11, '#ff00ff'],
				[12, '#00007f'],
				[13, '#0000ff'],
				[14, '#7f007f'],
				[15, '#ff00ff']])],
			['mpibuf', new Map<number,string>([
				[0, '#7f7f00'],
				[1, '#ffff00'],
				[2, '#007f7f'],
				[3, '#00ffff'],
				[4, '#7f7f00'],
				[5, '#ffff00'],
				[6, '#007f7f'],
				[7, '#00ffff'],
				[8, '#7f7f00'],
				[9, '#ffff00'],
				[10, '#007f7f'],
				[11, '#00ffff'],
				[12, '#7f7f00'],
				[13, '#ffff00'],
				[14, '#007f7f'],
				[15, '#00ffff']])],
			['spikes', new Map<number,string>([
				[0, '#ff7f00'],
				[1, '#7fff00'],
				[2, '#ff007f'],
				[3, '#7f00ff'],
				[4, '#ff7f00'],
				[5, '#7fff00'],
				[6, '#ff007f'],
				[7, '#7f00ff'],
				[8, '#ff7f00'],
				[9, '#7fff00'],
				[10, '#ff007f'],
				[11, '#7f00ff'],
				[12, '#ff7f00'],
				[13, '#7fff00'],
				[14, '#ff007f'],
				[15, '#7f00ff']])]
		]),
	}),
	getters: {
		/** Reading of a color:
         */
		colorAt(state) {
			return (kind: string, jobNr: number) =>
				state.strokeColor.get(kind)?.get(jobNr);
		},
		show(state) {
			return state.strokeColor;
		},
		numFields(state):number {
			return state.strokeColor.size;
		},
		getKind(state) {
			return (kind: string) => state.strokeColor.get(kind);
		},
	},
	actions: {
		setKind(kind: string, map: Map<number,string>) {
		    this.strokeColor.set(kind, map);
		},
	},
});
