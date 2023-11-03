export class EntityBuilder<T extends object> {
  updateManyProps(props: Partial<T>) {
    Object.keys(props).forEach((key) => {
      if (key in this && props[key] !== undefined) {
        this[key] = props[key];
      }
    });
  }

  toObject(): T {
    const obj = Object.keys(this).reduce((obj, key) => ({ ...obj, [key]: this[key] }), {} as T);

    return obj;
  }

  static build<T extends object>(instance: T, props: T) {
    Object.keys(props).forEach((key) => {
      if (key in instance) {
        // eslint-disable-next-line no-param-reassign
        instance[key] = props[key];
      }
    });
  }
}
