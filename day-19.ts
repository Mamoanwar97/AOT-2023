type Gifts = ['🛹', '🚲', '🛴', '🏄'];

type FlattenArray<Arr extends Array<any>> = Arr extends [infer Head, ...infer Tale] ? Head extends Array<any> ? [...Head, ...FlattenArray<Tale>] : [Head, ...FlattenArray<Tale>] : [];

type Repeat<Times extends number, Gift extends Gifts[number] , Acc extends Array<Gifts[number]> = []> = Times extends Acc["length"] ? Acc : Repeat<Times, Gift, [...Acc, Gift]>

type SetIterator<KidsWishes extends Array<number>, GiftIterator extends Array<any>> =  RebuildRecursive<KidsWishes, GiftIterator["length"] extends 3 ? [] : [...GiftIterator, 1]>

type RebuildRecursive<KidsWishes extends Array<number>, GiftIterator extends Array<any> = []> = KidsWishes extends [infer Head extends number, ...infer Tale extends Array<number>] ? [Repeat<Head, Gifts[GiftIterator["length"]]>, ...SetIterator<Tale, GiftIterator>] : [];

type Rebuild<KidsWishes extends Array<number>> = FlattenArray<RebuildRecursive<KidsWishes>>
