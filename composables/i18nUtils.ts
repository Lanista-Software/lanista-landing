export function getDefaultPathByFieldName<T>(array: T[], fieldName: keyof T, value: T[keyof T], dataName:string): string {
  const index =  array.findIndex((item) => item[fieldName] === value);
  return  `${dataName}[${index}]`
}