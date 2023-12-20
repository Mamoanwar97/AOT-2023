type BoxToys<Toy extends string, Repeat extends number, Acc extends Array<string> = []> = Repeat extends Acc["length"]? Acc :BoxToys<Toy,Repeat,[...Acc, Toy]>;
