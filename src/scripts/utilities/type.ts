type DeepPartial<O> = {
  [K in keyof O]+?: O[K] extends object ? DeepPartial<O[K]> : O[K];
};

type ExtractArrayType<A> = A extends Array<infer U> ? U : never;

type FilterKeysByType<O, T> = {
  [K in keyof O]: O[K] extends T ? K : never;
}[keyof O];

type Keys<O> = keyof O;

type NonReadonly<O> = {
  -readonly [K in keyof O]+?: O[K];
};

export { DeepPartial, ExtractArrayType, FilterKeysByType, Keys, NonReadonly };
