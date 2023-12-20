type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type ToAsciiArt<Sentence extends string> = RebuildSentence<DivideLines<Uppercase<Sentence>>>;

type DivideLines<
	Sentence extends string,
	Acc extends Array<string> = [],
> = Sentence extends `${infer A}\n${infer B}` ? DivideLines<B, [...Acc, A]> : [...Acc, Sentence];

type RebuildSentence<Lines extends string[], FullSentence extends string[] = []> = Lines extends [
	infer Head extends string,
	...infer Tale extends string[],
]
	? RebuildSentence<Tale, [...FullSentence, ...TransformSentence<Head>]>
	: FullSentence;

type TransformSentence<
	Sentence extends string,
	Layers extends string[] = [],
> = Layers["length"] extends 3
	? Layers
	: TransformSentence<Sentence, [...Layers, BuildLayer<Sentence, Layers["length"]>]>;

type BuildLayer<
	Sentence extends string,
	Index extends number,
	NewSentence extends string = "",
> = Sentence extends `${infer Char extends keyof Letters}${infer Rest}`
	? BuildLayer<Rest, Index, `${NewSentence}${Letters[Char][Index]}`>
	: NewSentence;
