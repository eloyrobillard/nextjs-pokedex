'use client';

import { useMemo, useState } from 'react';

import usePokemonNames from '@/hooks/usePokemonNames';

const debounce = (f, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f.apply(this, args), delay);
  }
};

export default function Home() {
  const { data: pokemonNames = [] } = usePokemonNames();

  const [value, setValue] = useState('');
  const [filteredValues, setFilteredValues] = useState([]);

  const filterValues = useMemo(() => debounce((searchString) => {
    const filteredValues = pokemonNames.filter((s) => s.includes(searchString));

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
