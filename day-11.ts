type ArrayProtector<T extends any[], Acc extends readonly any[] = []> = T["length"] extends 0 ? Acc : T extends [infer A, ... infer B]  ? A extends object?  ArrayProtector<B, [...Acc, SantaListProtector<A>]> : ArrayProtector<B, [...Acc, A]> : never;

type SantaListProtector<T extends object> = {
	readonly [k in keyof  T]: T[k] extends boolean | number | string |undefined |null | Function ? T[k] : T[k] extends object  ? SantaListProtector<T[k]> : T[k] extends any[] ?  ArrayProtector<T[k]> : never 
};
