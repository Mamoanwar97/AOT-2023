type AppendGood<TObject extends Record<string, any>,TKeys extends keyof TObject = keyof TObject> = {
	[K in TKeys as K extends string ? `good_${K}` : never]: TObject[K] 
};
