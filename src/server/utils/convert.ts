export function ToBoolean(val) {
  switch (typeof val) {
    case 'boolean':
      return val;
    case 'string':
      switch (val.toLowerCase()) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          throw Error(`string ${val} can't covert to boolean`);
      }
    default:
      throw Error(`Can't convert type of ${typeof val} value`);
  }
}
