type Connect4Chips = "🔴" | "🟡";
type Connect4EmptyCell = "  ";
type Connect4Cell = Connect4Chips | Connect4EmptyCell;
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";
type Connect4Board = Array<Array<Connect4Cell>>;

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Connect4Game = {
  board: Connect4Board;
  state: Connect4Chips;
};

type ToInt<Value extends number | string> = Value extends number
  ? Value
  : Value extends `${infer A extends number}`
  ? A
  : never;

type Connect4<
  Game extends Connect4Game,
  ColumnIndex extends number
> = EmptyRowIndex<Game["board"], ColumnIndex> extends never
  ? Game
  : StartGame<Game, ColumnIndex, EmptyRowIndex<Game["board"], ColumnIndex>>;

type EmptyRowIndex<
  Board extends Connect4Board,
  ColumnIndex extends number,
  $ColumnValues extends Array<Connect4Cell> = GetColumnValue<Board, ColumnIndex>
> = $ColumnValues extends [...infer Head extends Connect4Cell[], infer Tale]
  ? Tale extends Connect4EmptyCell
    ? Head["length"]
    : EmptyRowIndex<Board, ColumnIndex, Head>
  : never;

type GetColumnValue<Board extends Connect4Board, ColumnIndex extends number> = {
  [Row in keyof Board]: Board[Row][ColumnIndex];
};

type StartGame<
  Game extends Connect4Game,
  ColumnIndex extends number,
  RowIndex extends number,
  Board extends Connect4Board = UpdateBoard<
    Game["board"],
    Game["state"],
    ColumnIndex,
    RowIndex
  >
> = {
  board: Board;
  state: StateCheck<Board, Game["state"], ColumnIndex, RowIndex>;
};

type UpdateBoard<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  ColumnIndex extends number,
  RowIndex extends number,
  $Acc extends Connect4Board = []
> = Board extends [
  infer Row extends Connect4Cell[],
  ...infer RestOfBoard extends Connect4Board
]
  ? RowIndex extends $Acc["length"]
    ? UpdateBoard<
        RestOfBoard,
        Chip,
        ColumnIndex,
        RowIndex,
        [...$Acc, UpdateRow<Row, Chip, ColumnIndex>]
      >
    : UpdateBoard<RestOfBoard, Chip, ColumnIndex, RowIndex, [...$Acc, Row]>
  : $Acc;

type UpdateRow<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips,
  Index extends number,
  $Acc extends Connect4Cell[] = []
> = $Acc["length"] extends Row["length"]
  ? $Acc
  : $Acc["length"] extends Index
  ? UpdateRow<Row, Chip, Index, [...$Acc, Chip]>
  : UpdateRow<Row, Chip, Index, [...$Acc, Row[$Acc["length"]]]>;

type StateCheck<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  ColumnIndex extends number,
  RowIndex extends number
> = true extends
  | HasVerticalWin<Board, ColumnIndex>
  | HasHorizontalWin<Board, RowIndex>
  | HasDiagonalWin<Board, ColumnIndex, RowIndex>
  ? Extract<Connect4State, `${Chip} ${string}`>
  : Connect4EmptyCell extends Board[number][number]
  ? Exclude<Connect4Chips, Chip>
  : "Draw";

type HasVerticalWin<
  Board extends Connect4Board,
  ColumnNumber extends number
> = Has4ConsecutiveChips<GetColumnValue<Board, ColumnNumber>>;

type HasHorizontalWin<
  Board extends Connect4Board,
  RowNumber extends number
> = Has4ConsecutiveChips<GetRowValue<Board, RowNumber>>;

type GetRowValue<
  Board extends Connect4Board,
  RowNumber extends number
> = Board[RowNumber];

type Has4ConsecutiveChips<
  Chips extends Connect4Cell[],
  Acc extends Connect4Chips[] = []
> = Acc["length"] extends 4
  ? true
  : Chips extends [infer Head, ...infer Tale extends Connect4Cell[]]
  ? Head extends Connect4Chips
    ? Head extends Acc[number]
      ? Has4ConsecutiveChips<Tale, [...Acc, Head]>
      : Has4ConsecutiveChips<Tale, [Head]>
    : Has4ConsecutiveChips<Tale, Acc>
  : false;

type HasDiagonalWin<
  Board extends Connect4Board,
  ColumnIndex extends number,
  RowIndex extends number
> =
  | Has4ConsecutiveChips<
      GetLeftDiagonal<
        Board,
        Minus<CreateArrayOf<RowIndex>, 3>,
        Minus<CreateArrayOf<ColumnIndex>, 3>
      >
    >
  | Has4ConsecutiveChips<
      GetRightDiagonal<
        Board,
        Minus<CreateArrayOf<RowIndex>, 3>,
        Minus<AddUpTo<CreateArrayOf<ColumnIndex>, 3, Board[0]>, 1>
      >
    >;

type Add<X extends unknown[], Y extends number> = [...X, ...CreateArrayOf<Y>];

type AddUpTo<
  X extends unknown[],
  Y extends number,
  Max extends string[],
  $Acc extends unknown[] = []
> = [...X, ...$Acc]["length"] extends Max["length"]
  ? [...X, ...$Acc]
  : $Acc["length"] extends Y
  ? [...X, ...$Acc]
  : AddUpTo<X, Y, Max, [...$Acc, unknown]>;

type Minus<
  X extends unknown[],
  Y extends number,
  $Acc extends unknown[] = []
> = X extends [infer Head, ...infer Tale]
  ? $Acc["length"] extends Y
    ? X
    : Minus<Tale, Y, [...$Acc, Head]>
  : X;

type CreateArrayOf<
  X extends number,
  $Acc extends unknown[] = []
> = $Acc["length"] extends X ? $Acc : CreateArrayOf<X, [...$Acc, unknown]>;

type GetLeftDiagonal<
  Board extends Connect4Board,
  RowStart extends unknown[],
  ColumnStart extends unknown[],
  $Acc extends Connect4Cell[] = []
> = Board[RowStart["length"]][ColumnStart["length"]] extends Connect4Cell
  ? GetLeftDiagonal<
      Board,
      Add<RowStart, 1>,
      Add<ColumnStart, 1>,
      [...$Acc, Board[RowStart["length"]][ColumnStart["length"]]]
    >
  : $Acc;

type GetRightDiagonal<
  Board extends Connect4Board,
  RowStart extends unknown[],
  ColumnStart extends unknown[],
  $Acc extends Array<Connect4Cell> = []
> = Board[RowStart["length"]][ColumnStart["length"]] extends Connect4Cell
  ? GetRightDiagonal<
      Board,
      Add<RowStart, 1>,
      Minus<ColumnStart, 1>,
      [...$Acc, Board[RowStart["length"]][ColumnStart["length"]]]
    >
  : $Acc;
