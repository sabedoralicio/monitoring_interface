

/* integer range
 */
export function range(from:number, to:number) : number[] {
	return Array.from(Array(to - from + 1).keys()).map(x => x + from);
}

/* integer division
 * TODO: https://www.delftstack.com/howto/javascript/integer-division-javascript/#get-the-quotient-and-remainder-of-an-integer-division-using-the-math-library-in-javascript
 */
export function div(n:number, denom:number) : number {
	return Math.floor(n/denom);
}
