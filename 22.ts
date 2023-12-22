/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type SudokuTable = Reindeer[][][];

type FlattenArray<Param extends Array<any>, Acc extends Array<any> = []> = Param extends [
	infer A,
	...infer Rest,
]
	? A extends Array<any>
		? FlattenArray<Rest, [...Acc, ...FlattenArray<A>]>
		: FlattenArray<Rest, [...Acc, A]>
	: Acc;

type Validate<Table extends SudokuTable> = false extends IsGridValid<Table> ? false : true;

type IsGridValid<
	Table extends SudokuTable,
	$Acc extends Array<boolean> = [],
> = $Acc["length"] extends 9
	? true
	: false extends IsColumnValid<Table, $Acc["length"]> | IsRowValid<Table, $Acc["length"]>
		? false
		: IsGridValid<Table, [...$Acc, true]>;

type IsColumnValid<Table extends SudokuTable, ColumnNumber extends number> = DoesAllValuesExist<
	GetColumnValues<Table, ColumnNumber>
>;

type GetColumnValues<Table extends SudokuTable, ColumnNumber extends number> = Table extends [
	infer Row extends Reindeer[][],
	...infer Rest extends Reindeer[][][],
]
	? [FlattenArray<Row>[ColumnNumber], ...GetColumnValues<Rest, ColumnNumber>]
	: [];

type IsRowValid<Table extends SudokuTable, RowNumber extends number> = DoesAllValuesExist<
	FlattenArray<Table[RowNumber]>
>;

type DoesAllValuesExist<Block extends Array<any>> = Reindeer extends Block[number] ? true : false;
