
/* 8 bit color coding by RRRGGGBB of lowest byte;
 * greater bytes are left aside.
 */
export function intAs8BitCodedColor(v:number) : string {
	let fRG = 36.43; // 0xFF / 7
	let fB = 85.0; // 0xFF / 3
	let r= v%8;
	let g= ((v-r)/8)%8;
	let b= ((v-r-8*g)/64)%4;
	return 'rgb('+Math.round(fRG*r)+','+Math.round(fRG*g)+','+Math.round(fB*b)+')';
}

/*
 */
export function paletteBlueRed(percent:number) : string {
	let col = percent / 25.0;
	let mod = col % 1.0;
	var r:number;
	var g:number;
	var b:number;
	if(col >= 4.0){
		r= 1.0; g= 0.0; b= 0.0;
	} else if(col >= 3.0){
		r= 1.0; g= 1.0-mod; b= 0.0;
	} else if(col >= 2.0){
		r= mod; g= 1.0; b= 0.0;
	} else if(col >= 1.0){
		r= 0.0; g= 1.0; b= 1.0-mod;
	} else if(col >= 0.0){
		r= 0.0; g= mod; b= 1.0;
	} else {
		r= 0.0; g= 0.0; b= 1.0;
	}
	return 'rgb('+(255*r)+','+(255*g)+','+(255*b)+')';
}

/*
 */
export function paletteMagentaRed(percent:number) : string {
	let col = percent / 20.0;
	let mod = col % 1.0;
	var r:number;
	var g:number;
	var b:number;
	if(col >= 5.0){
		r= 1.0; g= 0.0; b= 0.0;
	} else if(col >= 4.0){
		r= 1.0; g= 1.0-mod; b= 0.0;
	} else if(col >= 3.0){
		r= mod; g= 1.0; b= 0.0;
	} else if(col >= 2.0){
		r= 0.0; g= 1.0; b= 1.0-mod;
	} else if(col >= 1.0){
		r= 0.0; g= mod; b= 1.0;
	} else if(col >= 0.0){
		r= 1.0-mod; g= 0.0; b= 1.0;
	} else {
		r= 1.0; g= 0.0; b= 1.0;
	}
	return 'rgb('+(255*r)+','+(255*g)+','+(255*b)+')';
}

/* Returns a gray value by % whiteness.
 */
export function graytone(percentWhite:number) : string {
	let w = 2.55*percentWhite;
	return 'rgb('+w+','+w+','+w+')';
}
