import React from 'react';
import {compose, withMemo} from '@truefit/bach';
import {Complex, complex, add, multiply} from 'mathjs';

import {ScatterChart, CartesianGrid, XAxis, YAxis, Scatter, ResponsiveContainer} from 'recharts';

import {comprehension} from 'fp-ts/lib/Array';
import Lab from './Lab';

const S = [
  complex(2, 2),
  complex(3, 2),
  complex(1.75, 1),
  complex(2, 1),
  complex(2.25, 1),
  complex(2.5, 1),
  complex(2.75, 1),
  complex(3, 1),
  complex(3.25, 1),
];
const graph = (complexArr: Complex[]) => {
  const data = complexArr.map((s) => ({x: s.re, y: s.im}));

  return (
    <ResponsiveContainer>
      <ScatterChart>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="x" domain={[0, 4]} scale="linear" minTickGap={0.2} />
        <YAxis dataKey="y" domain={[0, 6]} scale="linear" minTickGap={0.2} />
        <Scatter name="1.4.1" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

const One = () => graph(S);

const Three = () => {
  const data = comprehension<Complex, Complex>([S], (x) => add(x, complex(1, 2)) as Complex);

  return graph(data);
};
const Seven = () => {
  const data = comprehension<Complex, Complex>([S], (x) => multiply(x, 0.5) as Complex);

  return graph(data);
};
const Eight = () => {
  const adj = multiply(0.5, complex(0, 1));
  const data = comprehension<Complex, Complex>([S], (x) => multiply(x, adj) as Complex);

  return graph(data);
};

const logic = () => {
  return {
    '1.4.1': One,
    '1.4.3': Three,
    '1.4.7': Seven,
    '1.4.8': Eight,
  };
};

export default compose(withMemo('output', logic))(Lab);
