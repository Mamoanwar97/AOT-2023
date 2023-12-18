//The idea from https://github.com/TkDodo/aot-2023/blob/main/18.ts
type Filter<TItems extends Array<any>, TSearch extends string> =
  TItems extends [infer Head, ...infer Tail]
    ? Head extends TSearch
      ? [Head, ...Filter<Tail, TSearch>]
      : Filter<Tail, TSearch>
    : []

type Count<TItems extends Array<any>, TSearch extends string> =
  Filter<TItems, TSearch>['length']
