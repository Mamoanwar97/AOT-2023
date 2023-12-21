type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type PositionToValue = {
	top: 0;
	middle: 1;
	bottom: 2;
	left: 0;
	center: 1;
	right: 2;
};

type TicTacToe<
	Game extends TicTacToeGame,
	NextPosition extends TicTacToePositions,
> = NextPosition extends `${infer YPosition extends TicTacToeYPositions}-${infer XPosition extends
	TicTacToeXPositions}`
	? ExtractPosition<Game, [PositionToValue[YPosition], PositionToValue[XPosition]]>
	: Game;

type ExtractPosition<
	Game extends TicTacToeGame,
	Position extends [number, number],
> = Game["board"][Position[0]][Position[1]] extends TicTacToeEmptyCell
	? Game["state"] extends TicTacToeChip
		? GameOutput<UpdateBoard<Game["board"], Game["state"], Position>, Game["state"]>
		: Game
	: Game;

type UpdateBoard<
	Board extends TicTactToeBoard,
	Move extends TicTacToeChip,
	Position extends [number, number],
	NewBoard extends TicTactToeBoard = [],
> = NewBoard["length"] extends 3
	? NewBoard
	: Position[0] extends NewBoard["length"]
		? UpdateBoard<
				Board,
				Move,
				Position,
				[...NewBoard, UpdateRow<Board[NewBoard["length"]], Move, Position[1]>]
			>
		: UpdateBoard<Board, Move, Position, [...NewBoard, Board[NewBoard["length"]]]>;

type UpdateRow<
	Row extends TicTacToeCell[],
	Move extends TicTacToeChip,
	Position extends number,
	Acc extends TicTacToeCell[] = [],
> = Acc["length"] extends 3
	? Acc
	: Acc["length"] extends Position
		? UpdateRow<Row, Move, Position, [...Acc, Move]>
		: UpdateRow<Row, Move, Position, [...Acc, Row[Acc["length"]]]>;

type GameOutput<Board extends TicTactToeBoard, LatestChip extends TicTacToeChip> = {
	board: Board;
	state: StateCheck<Board, LatestChip>;
};

type WinPossibilities<Board extends TicTactToeBoard> =
	| Board[number]
	| [Board[0][0], Board[1][0], Board[2][0]]
	| [Board[0][1], Board[1][1], Board[2][1]]
	| [Board[0][2], Board[1][2], Board[2][2]]
	| [Board[0][0], Board[1][1], Board[2][2]]
	| [Board[0][2], Board[1][1], Board[2][0]];

type StateCheck<Board extends TicTactToeBoard, LatestChip extends TicTacToeChip> = [
	LatestChip,
	LatestChip,
	LatestChip,
] extends WinPossibilities<Board>
	? `${LatestChip} Won`
	: TicTacToeEmptyCell extends Board[number][number]
		? Exclude<TicTacToeChip, LatestChip>
		: "Draw";
