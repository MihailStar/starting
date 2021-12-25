function isKeyInObject<Obj extends object>(
  key: PropertyKey,
  object: Obj
): key is keyof Obj {
  return key in object;
}

export { isKeyInObject };
