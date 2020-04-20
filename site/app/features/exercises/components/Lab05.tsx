import {compose, withMemo} from '@truefit/bach';
import {mean, sum, mod, pow, range, setDistinct} from 'mathjs';
import {comprehension, zip} from 'fp-ts/lib/Array';
import {toArray} from 'fp-ts/lib/Set';
import {identity} from 'rxjs';
import {ordString} from 'fp-ts/lib/Ord';
import Lab from './Lab';

const one = () => {
  return 7 * 24 * 60;
};

const two = () => {
  return mod(2304811, 47);
};

const three = () => {
  return (673 + 909) / 3 === 0;
};

const four = () => {
  const x = -9;
  const y = 1 / 2;

  return x + 10 < 0 ? 2 * (y + 1 / 2) : 2 * (y - 1 / 2);
};

const five = () => {
  const set = [0, 1, 2, 3, 4, 5];

  return set.filter((x) => x > 0).map((x) => pow(x, 2));
};

const six = () => {
  const set = [0, 1, 2, 3, 4];

  return set.map((x) => pow(2, x));
};

const seven = () => {
  const projection = (x: number, y: number) => x * y;

  const result = comprehension(
    [
      [4, 5, 6],
      [5, 6, 7],
    ],
    projection,
  );

  return setDistinct(result);
};

const eight = () => {
  const projection = (x: number, y: number) => x * y;
  const filter = (x: number, y: number) => x !== y;

  const result = comprehension(
    [
      [4, 5, 6],
      [5, 6, 7],
    ],
    projection,
    filter,
  );

  return setDistinct(result);
};

const nine = () => {
  const S = [1, 2, 3, 4];
  const T = [3, 4, 5, 6];

  const filter = (x: number) => T.includes(x);

  const result = comprehension([S], identity, filter);

  return result;
};

const ten = () => {
  return mean([20, 10, 15, 75]);
};

const eleven = () => {
  const projection = (x: string, y: number) => [x, y];

  const result = comprehension(
    [
      ['A', 'B', 'C'],
      [1, 2, 3],
    ],
    projection,
  );

  return result;
};

const twelve = () => {
  const LofL = [
    [0.25, 0.75, 0.2],
    [-1, 0],
    [4, 4, 4, 4],
  ];

  return sum(comprehension([LofL], sum));
};

const eighteen = () => {
  const set = range(0, 100).toArray() as number[];
  const filter = (x: number) => x % 2 !== 0;

  const result = comprehension([set], identity, filter);

  return result;
};

const nineteen = () => {
  const L = ['A', 'B', 'C', 'D', 'E'];
  const N = range(0, L.length).toArray() as number[];

  return zip(N, L);
};

const twenty = () => {
  const l1 = [10, 25, 40];
  const l2 = [1, 15, 20];

  const projection = ([x1, x2]: number[]) => x1 + x2;

  return comprehension([zip(l1, l2)], projection);
};

const twentyOne = () => {
  type Person = {
    James: string;
    director: string;
  };

  const dlist = new Array<Person>(
    {James: 'Sean', director: 'Terence'},
    {James: 'Roger', director: 'Lewis'},
    {James: 'Pierce', director: 'Roger'},
  );

  const find = (i: number, k: keyof Person) => dlist[i][k];

  return find(0, 'James');
};

const twentyTwo = () => {
  type Person = {
    Bilbo: string;
    Frodo?: string;
    Thorin?: string;
  };

  const dlist = new Array<Person>(
    {Bilbo: 'Ian', Frodo: 'Elijah'},
    {Bilbo: 'Roger', Thorin: 'Lewis'},
  );

  const filter = (k: keyof Person) => (p: Person) => !!p[k];

  const find = (i: number, k: keyof Person) => {
    const list = comprehension([dlist], identity, filter(k));

    return list[i]?.Bilbo ?? 'NOT PRESENT';
  };

  return [find(0, 'Bilbo'), find(0, 'Frodo'), find(0, 'Thorin'), find(2, 'Frodo')];
};

const twentyThree = () => {
  const projection = (n: number) => JSON.stringify({[n]: pow(n, 2)});

  return comprehension([range(0, 100).toArray() as number[]], projection);
};

const twentyFour = () => {
  const D = new Set<string>(['red', 'white', 'blue']);

  return comprehension([toArray(ordString)(D)], identity);
};

const logic = () => {
  return {
    '0.5.1': one(),
    '0.5.2': two(),
    '0.5.3': three().toString(),
    '0.5.4': four(),
    '0.5.5': five().toString(),
    '0.5.6': six().toString(),
    '0.5.7': seven().toString(),
    '0.5.8': eight().toString(),
    '0.5.9': nine().toString(),
    '0.5.10': ten().toString(),
    '0.5.11': eleven().toString(),
    '0.5.12': twelve().toString(),
    '0.5.18': eighteen().toString(),
    '0.5.19': nineteen().toString(),
    '0.5.20': twenty().toString(),
    '0.5.21': twentyOne().toString(),
    '0.5.22': twentyTwo().toString(),
    '0.5.23': twentyThree().toString(),
    '0.5.24': twentyFour().toString(),
  };
};

export default compose(withMemo('output', logic))(Lab);
