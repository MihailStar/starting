/* eslint-disable func-names */

function cachingDecorator<Arg, Val>(
  func: (argument: Arg) => Val,
): (arg: Arg) => Val {
  const cache = new Map<Arg, Val>();

  return function (arg: Arg): Val {
    const value = cache.get(arg);

    if (value !== undefined) {
      return value;
    }

    const result = func(arg);

    cache.set(arg, result);

    return result;
  };
}

export { cachingDecorator };
