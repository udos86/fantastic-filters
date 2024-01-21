# Demo

```ts
type Demo = {
  prop: number;
  nested1: {
    prop1: string;
    nested2: {
      prop2: boolean;
      nested3: {
        prop3: symbol;
      }
    },
  }
}

type DemoFilter = PathFilter<Demo>;

const filter1 = {
  title: 'A demo filter',
  path: ['prop'],
  map: (value: number) => `${value}`
} satisfies DemoFilter;

const filter2 = {
  title: 'Another demo filter',
  path: ['nested1', 'prop1']
} satisfies DemoFilter;

const filters: DemoFilter[] = [filter1, filter2];
```
