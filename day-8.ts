type RemoveNaughtyChildren<TObject extends object> = {
	[k in Exclude<keyof TObject, `naughty_${string}`>]: TObject[k]
};
