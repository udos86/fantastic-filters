/*
type DotPathOf<Type extends Record<KeyType, unknown>, KeyType extends string | number = string> = {
  [Key in Extract<keyof Type, KeyType>]: Type[Key] extends Array<any>
  ? Key
  : Type[Key] extends Record<KeyType, unknown>
  ? `${Key}` | `${Key}.${DotPathOf<Type[Key], KeyType>}`
  : Key
}[Extract<keyof Type, KeyType>];
*/

type DotPathOf<T extends Record<string, unknown>, Key = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${DotPathOf<T[Key]>}`
    : `${Key}`
  : never;

/*
export type PathOf<Type extends Record<string, unknown>, _Acc extends string[] = []> = {
  [Key in Extract<keyof Type, string>]: Type[Key] extends Array<unknown>
  ? [..._Acc, Key]
  : Type[Key] extends Record<string, unknown>
    ? PathOf<Type[Key], [..._Acc, Key]>
    : [..._Acc, Key];
}[Extract<keyof Type, string>];
*/
export type PathOf<Type extends Record<string, unknown>, Key extends Extract<keyof Type, string> = Extract<keyof Type, string>, _Acc extends string[] = []> = 
  Key extends keyof Type
    ? Type[Key] extends Record<string, unknown>
      ? PathOf<Type[Key], Extract<keyof Type[Key], string>, [..._Acc, Key]>
      : [..._Acc, Key]
  : never;

export type TypeOfPath<Type extends Record<string, unknown>, Path extends string[], _Acc extends number[] = []> =
  Type[Path[_Acc['length']]] extends Record<string, unknown>
  ? TypeOfPath<Type[Path[_Acc['length']]], Path, [..._Acc, _Acc['length']]>
  : Type[Path[_Acc['length']]] extends Array<unknown> | bigint | boolean | number | null | string | symbol | undefined
    ? Type[Path[_Acc['length']]] 
    : never;

export type PathFilter<Type extends Record<string, unknown>, MapType = unknown, _Acc extends string[] = []> = {
  [Key in Extract<keyof Type, string>]-?: Type[Key] extends Record<string, unknown>
  ? PathFilter<Type[Key], MapType, [..._Acc, Key]>
  : {
    title: string;
    path: [..._Acc, Key];
    map?: (value: TypeOfPath<Type, [Key]>) => MapType;
  };
}[Extract<keyof Type, string>];

export type ExplicitPathFilter<Type extends Record<string, unknown>, Path extends PathOf<Type> = PathOf<Type>, MapType = unknown> = {
  title: string;
  path: Path
  map?: (value: TypeOfPath<Type, Path>) => MapType;
}
