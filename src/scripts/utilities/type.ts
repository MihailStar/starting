type DeepPartial<Obj> = {
  [K in keyof Obj]+?: Obj[K] extends object ? DeepPartial<Obj[K]> : Obj[K];
};

// type ExtractArrayType<Arr> = Arr[Exclude<keyof Arr, keyof []>];
// type ExtractArrayType<Arr> = Arr[Extract<keyof Arr, number>];
type ExtractArrayType<Arr> = Arr extends Array<infer U> | ReadonlyArray<infer U>
  ? U
  : never;

type FilterKeysByType<Obj, Type> = {
  [K in keyof Obj]: Obj[K] extends Type ? K : never;
}[keyof Obj];

type NonReadonly<Obj> = {
  -readonly [K in keyof Obj]+?: Obj[K];
};

export { DeepPartial, ExtractArrayType, FilterKeysByType, NonReadonly };
