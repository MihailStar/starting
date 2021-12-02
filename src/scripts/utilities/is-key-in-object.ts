function isKeyInObject<O extends object>(
  key: unknown,
  object: O
): key is keyof O {
  return (key as keyof O) in object;
}

export { isKeyInObject };
