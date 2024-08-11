export type Obj = {
  [key: string]: Obj;
};

export const getValueFromKeyPath = (item: Obj, path: string[]) => {
  return path.reduce((value, currentKey) => value && value[currentKey], item).toString();
};
