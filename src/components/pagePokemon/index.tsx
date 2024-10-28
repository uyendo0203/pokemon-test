'use client';
import { useState } from 'react';
import PokemonList from '../pokemonList';

const PagePokemon = ({ types, pokemons }: any) => {
  const itemsPerPage = 48;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleSelect = (type: any) => {
    setSelectedTypes((prevSelected: any) => {
      if (prevSelected.includes(type.name)) {
        return prevSelected.filter((item: any) => item !== type.name);
      } else {
        return [...prevSelected, type.name];
      }
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentPokemon = pokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  return (
    <main>
      <div className='mx-auto max-w-screen-xl'>
        <div className='flex items-center mx-4 my-4'>
          <div className='mr-2 my-4 font-bold self-start'>Types:</div>
          <div>
            {types.map((iType: any, index: number) => (
              <button
                key={index}
                onClick={() => toggleSelect(iType)}
                className={`px-2 py-2 mx-2 my-2 border-2 rounded-md font-bold ${selectedTypes.includes(iType.name)
                  ? 'text-white bg-red-900 border-red-900'
                  : 'text-red-900 border-red-900'
                  }`}
              >
                {iType.name}
              </button>
            ))}
          </div>
        </div>
        <div className='my-12 mx-4 font-bold'>
          {pokemons.length} results found.
        </div>
      </div>

      {<PokemonList data={currentPokemon} />}
      <div className='mt-8 flex justify-center'>
        <button
          onClick={handleBack}
          className={`p-2 bg-red-900 rounded-md text-white mr-4 ${currentPage == 1
            ? 'disabled:opacity-40 disabled:cursor-not-allowed select-none'
            : ''
            }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default PagePokemon;
