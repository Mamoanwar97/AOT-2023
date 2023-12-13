type StreetSuffixTester<StreetName extends string, Tsuffix extends string> = StreetName extends `${string}${Tsuffix}` ? true : false;
