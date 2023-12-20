type AppendToEnd<TEnd extends number, TAcc extends number[]> = TAcc["length"] extends TEnd? TAcc[number] | TAcc["length"] : AppendToEnd<TEnd, [...TAcc, TAcc["length"]]>

type DayCounter<TStart extends number, TEnd extends number, TAcc extends number[] = []> = TAcc["length"] extends TStart ? AppendToEnd<TEnd, TAcc> : DayCounter<TStart, TEnd, [...TAcc, TStart]>;
