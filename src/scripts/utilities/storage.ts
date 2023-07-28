class Storage<Type extends object> {
  private readonly getNamespace: () => string;

  public constructor(namespace: string) {
    this.getNamespace = (): typeof namespace => namespace;
  }

  public static isAvailable(): boolean {
    const identifier = Date.now().toString();

    try {
      localStorage.setItem(identifier, identifier);
      localStorage.removeItem(identifier);

      return true;
    } catch {
      return false;
    }
  }

  public get(): Type | null {
    try {
      const data = localStorage.getItem(this.getNamespace());

      return typeof data === 'string' ? (JSON.parse(data) as Type) : null;
    } catch {
      return null;
    }
  }

  public set(data: Type): boolean {
    try {
      localStorage.setItem(this.getNamespace(), JSON.stringify(data));

      return true;
    } catch {
      return false;
    }
  }
}

export { Storage };
