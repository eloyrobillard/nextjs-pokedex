'use client';

import { useMemo, useState } from 'react';

const randomWords = [
  'groggily', 'degraded', 'acts', 'fraying', 'submersed', 'shrill',
  'upbeat', 'underling', 'property', 'railing', 'wikipedia', 'empathic',
  'trim', 'man', 'slap', 'noise', 'pin', 'data',
  'thanks', 'rich', 'behave', 'scared', 'grade', 'power',
  'mass', 'smooth', 'ruin'
];

const debounce = (f, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f.apply(this, args), delay);
  }
};

export default function Home() {
  const [value, setValue] = useState('');
  const [filteredValues, setFilteredValues] = useState([]);

  const filterValues = useMemo(() => debounce((searchString) => {
    const filteredValues = randomWords.filter((s) => s.includes(searchString));

    setFilteredValues(filteredValues);
  }), []);

  const handleInput = (e) => {
    e.preventDefault();

    setValue(e.target.value);
    filterValues(e.target.value);
  };

  return (
    <div>
      <input type='text' value={value} onInput={handleInput} className="text-black" />
      {/* just passing index as key for now */}
      {filteredValues.map((value, i) => (<p key={i}>{value}</p>))}
    </div>
  )
}
