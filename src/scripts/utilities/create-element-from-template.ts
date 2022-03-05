function createElementFromTemplate<Type extends Element = Element>(
  template: string
): Type {
  const container = document.createElement('template');

  container.innerHTML = template.trim();

  return container.content.firstChild as Type;
}

export { createElementFromTemplate };
