export type StaticFilterMatch = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual';

export type StaticFilterOptions<Type extends Array<unknown> | bigint | boolean | number | null | string | symbol | undefined> = {
  value: Type;
  label: string;
  match: StaticFilterMatch
}

export type StaticPathFilter<Type extends Record<string, unknown>, MapType = unknown, _Acc extends string[] = []> = {
  [Key in Extract<keyof Type, string>]-?: Type[Key] extends Record<string, unknown>
  ? StaticPathFilter<Type[Key], MapType, [..._Acc, Key]>
  : {
    title: string;
    path: [..._Acc, Key];
    options: StaticFilterOptions<TypeOfPath<Type, [Key]>>[];
  };
}[Extract<keyof Type, string>];

export type ExplicitPathFilter<Type extends Record<string, unknown>, Path extends PathOf<Type> = PathOf<Type>, MapType = unknown> = {
  title: string;
  path: Path
  map?: (value: TypeOfPath<Type, Path>) => MapType;
}
