type Reverse<TString extends string, TAcc extends string = ""> = TString extends "" ? TAcc : TString extends `${infer A}${infer B}` ? Reverse<B, `${A}${TAcc}`>  : never;
