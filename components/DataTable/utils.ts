export function getValue(obj: any, key: string) {
  return key.split(".").reduce((acc, part) => acc?.[part], obj);
}