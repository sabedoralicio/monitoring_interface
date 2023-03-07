

const nodeCountJUWELS:number = 122992; // 122768 CPU + 224 GPU
const nodeCountJURECA:number = 99072; // 98304 CPU + 768 GPU
const nodeCountJUSUF:number = 26301; // 26240 CPU + 61 GPU
const nodeCount8192:number = 8192;
const nodeCount2048:number = 2048;
const nodeCount512:number = 512;
const nodeCount128:number = 128;

export
type NodeLore = [boolean,number,string];

export
function with20x2_4(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<20; n++){
		bef.push([firstNr+2*n, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.0']]);
		bef.push([firstNr+2*n+1, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.1']]);
	}
	bef.push([firstNr+40, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 0']]);
	bef.push([firstNr+41, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 1']]);
	bef.push([firstNr+42, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 2']]);
	bef.push([firstNr+43, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 3']]);
	return [firstNr+44, bef];
}

export
function with24x2_0(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<24; n++){
		bef.push([firstNr+2*n, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.0']]);
		bef.push([firstNr+2*n+1, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.1']]);
	}
	return [firstNr+48, bef];
}

export
function with64x2_0(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<64; n++){
		bef.push([firstNr+2*n, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.0']]);
		bef.push([firstNr+2*n+1, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.1']]);
	}
	return [firstNr+128, bef];
}

export
function with64x2_1(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<64; n++){
		bef.push([firstNr+2*n, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.0']]);
		bef.push([firstNr+2*n+1, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.1']]);
	}
	bef.push([firstNr+128, [false, 100*Math.pow(Math.random(),2), prefix+'GPU']]);
	return [firstNr+129, bef];
}

export
function with64x2_4(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<64; n++){
		bef.push([firstNr+2*n, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.0']]);
		bef.push([firstNr+2*n+1, [false, 100*Math.pow(Math.random(),2), prefix+'Core '+n+'.1']]);
	}
	bef.push([firstNr+128, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 0']]);
	bef.push([firstNr+129, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 1']]);
	bef.push([firstNr+130, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 2']]);
	bef.push([firstNr+131, [false, 100*Math.pow(Math.random(),2), prefix+'GPU 3']]);
	return [firstNr+132, bef];
}

export
function withJuwelsAccelerated(prefix:string,
							   firstNr:number,
							   bef:Array<[number,NodeLore]>
							  ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<56; n++){
		[fn,st] = with20x2_4(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+2464, st];
}

export
function withJusufAccelerated(prefix:string,
							  firstNr:number,
							  bef:Array<[number,NodeLore]>
							 ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<61; n++){
		[fn,st] = with64x2_1(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+7869, st];
}

export
function withJuwelsLargeMem(prefix:string,
							firstNr:number,
							bef:Array<[number,NodeLore]>
						   ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<240; n++){
		[fn,st] = with24x2_0(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+11520, st];
}

export
function withJurecaLargeMem(prefix:string,
							firstNr:number,
							bef:Array<[number,NodeLore]>
						   ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<96; n++){
		[fn,st] = with64x2_0(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+12288, st];
}

export
function withJusufStd(prefix:string,
					  firstNr:number,
					  bef:Array<[number,NodeLore]>
					 ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<144; n++){
		[fn,st] = with64x2_0(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+18432, st];
}

export
function withJurecaAccelerated(prefix:string,
					           firstNr:number,
					           bef:Array<[number,NodeLore]>
					          ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<192; n++){
		[fn,st] = with64x2_4(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+25344, st];
}

export
function withJusuf(prefix:string,
				   firstNr:number,
				   bef:Array<[number,NodeLore]>
				  ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	[fn,st] = withJusufStd(prefix+'Std ',fn,st);
	[fn,st] = withJusufAccelerated(prefix+'Acc ',fn,st);
	return [firstNr+26240, st];
}

export
function withJurecaStd(prefix:string,
					   firstNr:number,
					   bef:Array<[number,NodeLore]>
					  ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<480; n++){
		[fn,st] = with64x2_0(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+61440, st];
}

export
function withJureca(prefix:string,
					firstNr:number,
					bef:Array<[number,NodeLore]>
				   ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	[fn,st] = withJurecaStd(prefix+'Std ',fn,st);
	[fn,st] = withJurecaLargeMem(prefix+'Mem ',fn,st);
	[fn,st] = withJurecaAccelerated(prefix+'Acc ',fn,st);
	return [firstNr+98304, st];
}

export
function withJuwelsStd(prefix:string,
					   firstNr:number,
					   bef:Array<[number,NodeLore]>
					  ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	for(let n=0; n<2271; n++){
		[fn,st] = with24x2_0(prefix+'#'+n+' ',fn,st);
	}
	return [firstNr+109008, st];
}

export
function withJuwels(prefix:string,
				    firstNr:number,
					bef:Array<[number,NodeLore]>
				   ): [number,Array<[number,NodeLore]>] {
	var fn:number = firstNr;
	var st:Array<[number,NodeLore]> = bef;
	[fn,st] = withJuwelsStd(prefix+'Std ',fn,st);
	[fn,st] = withJuwelsLargeMem(prefix+'Mem ',fn,st);
	[fn,st] = withJuwelsAccelerated(prefix+'Acc ',fn,st);
	return [firstNr+122768, st];
}

export
function withN(N:number,
			   prefix:string,
			   firstNr:number,
			   bef:Array<[number,NodeLore]>): [number,Array<[number,NodeLore]>] {
	for(let n=0; n<N; n++){
		bef.push([firstNr+n, [false, 100*Math.pow(Math.random(),2), prefix+'#'+n]]);
	}
	return [firstNr+N, bef];
}
