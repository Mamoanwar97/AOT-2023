type Alley = "  ";
type MazeSanta = "🎅";
type MazeTree = "🎄";
type MazeItem = MazeTree | MazeSanta | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type Move<
	Maze extends MazeMatrix,
	Direction extends Directions,
> = GetSantaCoordinates<Maze> extends never
	? Maze
	: true extends WinConditions<GetSantaCoordinates<Maze>, Direction>
		? MazeWin
		: UpdateMaze<Maze, GetSantaCoordinates<Maze>, Direction>;

type GetSantaCoordinates<Maze extends MazeMatrix> = Maze extends [
	...infer RestOfMaze extends MazeMatrix,
	infer Row extends MazeItem[],
]
	? MazeSanta extends Row[number]
		? [RestOfMaze["length"], FindInRow<Row>]
		: GetSantaCoordinates<RestOfMaze>
	: never;

type FindInRow<Row extends MazeItem[]> = Row extends [
	...infer RestOfRow extends MazeItem[],
	infer Item,
]
	? MazeSanta extends Item
		? RestOfRow["length"]
		: FindInRow<RestOfRow>
	: never;

type WinConditions<Coordinates extends [number, number], Direction extends Directions> =
	| WinByMovingUp<Coordinates[0], Direction>
	| WinByMovingLeft<Coordinates[1], Direction>
	| WinByMovingRight<Coordinates[1], Direction>
	| WinByMovingDown<Coordinates[0], Direction>;

type WinByMovingUp<RowNumber extends number, Direction extends Directions> = Direction extends "up"
	? RowNumber extends 0
		? true
		: false
	: false;
type WinByMovingLeft<
	ColumnNumber extends number,
	Direction extends Directions,
> = Direction extends "left" ? (ColumnNumber extends 0 ? true : false) : false;
type WinByMovingRight<
	ColumnNumber extends number,
	Direction extends Directions,
> = Direction extends "right" ? (ColumnNumber extends 9 ? true : false) : false;
type WinByMovingDown<
	RowNumber extends number,
	Direction extends Directions,
> = Direction extends "down" ? (RowNumber extends 9 ? true : false) : false;

type Add<X extends any[], Y extends any[]> = [...X, ...Y]["length"];

type Minus<X extends any[], Y extends number, $Acc extends any[] = []> = X extends [
	infer Head,
	...infer Tale,
]
	? $Acc["length"] extends Y
		? X["length"]
		: Minus<Tale, Y, [...$Acc, Head]>
	: X["length"];

type CreateArrayOf<X extends number, $Acc extends unknown[] = []> = $Acc["length"] extends X
	? $Acc
	: CreateArrayOf<X, [...$Acc, unknown]>;

type NextCoordinate<
	Coordinates extends [number, number],
	Direction extends Directions,
> = Direction extends "up"
	? [Minus<CreateArrayOf<Coordinates[0]>, 1>, Coordinates[1]]
	: Direction extends "down"
		? [Add<CreateArrayOf<Coordinates[0]>, [true]>, Coordinates[1]]
		: Direction extends "left"
			? [Coordinates[0], Minus<CreateArrayOf<Coordinates[1]>, 1>]
			: [Coordinates[0], Add<CreateArrayOf<Coordinates[1]>, [true]>];

type UpdateMaze<
	Maze extends MazeMatrix,
	Coordinates extends [number, number],
	Direction extends Directions,
> = NextCoordinate<Coordinates, Direction> extends [number, number]
	? GetFinalMaze<Maze, Coordinates, NextCoordinate<Coordinates, Direction>>
	: Maze;

type GetFinalMaze<
	Maze extends MazeMatrix,
	Coordinates extends [number, number],
	NewCoordinates extends [number, number],
> = Maze[NewCoordinates[0]][NewCoordinates[1]] extends Alley
	? RebuildMaze<RebuildMaze<Maze, Coordinates, Alley>, NewCoordinates, MazeSanta>
	: Maze;

type RebuildMaze<
	Maze extends MazeMatrix,
	Coordinates extends [number, number],
	Item extends MazeSanta | Alley,
> = {
	[Row in keyof Maze]: Row extends `${Coordinates[0]}`
		? UpdateRow<Maze[Row], Coordinates[1], Item>
		: Maze[Row];
};

type UpdateRow<
	Row extends MazeItem[],
	Coordinate extends number,
	Item extends MazeSanta | Alley,
	$Acc extends MazeItem[] = [],
> = $Acc["length"] extends Row["length"]
	? $Acc
	: $Acc["length"] extends Coordinate
		? UpdateRow<Row, Coordinate, Item, [...$Acc, Item]>
		: UpdateRow<Row, Coordinate, Item, [...$Acc, Row[$Acc["length"]]]>;
