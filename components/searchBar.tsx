/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/router';
import { IoSearchOutline } from '../utils/icons';

interface SearchBarProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<any>>;
}

const SearchBar = ({ input, setInput }: SearchBarProps) => {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      router.push(`/search?query=${input}`);
    }
  };

  return (
    <div className='relative'>
      <IoSearchOutline
        size={20}
        className='absolute left-3 top-1/2 -translate-y-1/2 transform'
      />
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Buscar producto'
        className='input input-sm rounded bg-gray-100 py-2 pl-10 pr-4 outline-none'
      />
    </div>
  );
};

export default SearchBar;
