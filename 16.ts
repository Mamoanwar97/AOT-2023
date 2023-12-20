type FindSantaInSingleArray<SantaArray extends Array<any>, ACC extends Array<any> = [] > = SantaArray extends ['🎅🏼', ...any] ? ACC["length"] : SantaArray extends [any, ...infer A] ? FindSantaInSingleArray<A, [...ACC, any]> : never ;

type FindSanta<SantaArray extends Array<Array<any>>, ACC extends Array<any> = []> =  FindSantaInSingleArray<SantaArray[ACC["length"]]> extends never? ACC["length"] extends SantaArray["length"] ? never : FindSanta<SantaArray, [...ACC, SantaArray[ACC["length"]]]> : [ACC["length"], FindSantaInSingleArray<SantaArray[ACC["length"]]> ];
