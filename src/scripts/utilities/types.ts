type DeepPartial<Obj> = {
  [K in keyof Obj]+?: Obj[K] extends object ? DeepPartial<Obj[K]> : Obj[K];
};

type NonReadonly<Obj> = {
  -readonly [K in keyof Obj]: Obj[K];
};

/* type GetArrayType<Arr> = Arr[Exclude<keyof Arr, keyof []>]; */
/* type GetArrayType<Arr> = Arr[Extract<keyof Arr, number>]; */
type GetArrayType<Arr> = Arr extends Array<infer U> | ReadonlyArray<infer U>
  ? U
  : never;

type ExcludeKeysByType<Obj, Type> = {
  [K in keyof Obj]: Obj[K] extends Type ? never : K;
}[keyof Obj];

type ExtractKeysByType<Obj, Type> = {
  [K in keyof Obj]: Obj[K] extends Type ? K : never;
}[keyof Obj];

export {
  type DeepPartial,
  type ExcludeKeysByType,
  type ExtractKeysByType,
  type GetArrayType,
  type NonReadonly,
};
