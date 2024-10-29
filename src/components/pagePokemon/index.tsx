'use client';
import { useEffect, useState } from 'react';
import PokemonList from '../pokemonList';

const PagePokemon = ({ }: any) => {
  const itemsPerPage = 48;
  const limitFirstLoad = 1200;
  const apiListType = 'https://pokeapi.co/api/v2/type/';
  const apiListPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=';
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    _handleFetchPokemon();
    fetchAllPokemonTypes().then((types) => {
      setTypes(types);
    });
  }, []);

  useEffect(() => {
    const listIdTypes = selectedTypes.map((iType) => iType);

    if (listIdTypes.length > 0) {
      const pokemonByTypes = types
        .filter((type) => listIdTypes.includes(type.id))
        .map((item) => {
          return item.pokemon.map((p: any) => {
            return p.pokemon;
          });
        });

      const filteredPokemon = pokemonByTypes.reduce((acc, curr) =>
        acc.filter((pokemon: any) => {
          return curr.some((p: any) => p.name === pokemon.name);
        })
      );
      setPokemons(filteredPokemon);
    } else {
      setPokemons(allPokemons);
    }
  }, [selectedTypes]);

  async function fetchAllPokemonTypes() {
    try {
      const response = await fetch(apiListType);
      const data = await response.json();

      const typeDetailsPromises = data.results.map(async (type: any) => {
        const typeResponse = await fetch(type.url);
        return typeResponse.json();
      });

      const allTypeDetails = await Promise.all(typeDetailsPromises);

      return allTypeDetails;
    } catch (error) {
      console.error('Error fetching Pokémon types:', error);
      return [];
    }
  }

  const _handleFetchPokemon = async () => {
    const resPokemons = await fetch(
      `${apiListPokemons}${limitFirstLoad}`
    );
    const resPokemonTypes: any = await fetch(apiListType);
    const listPokemon: any = await resPokemons.json();
    const listPokemonType: any = await resPokemonTypes.json();
    setPokemons(listPokemon.results);
    setAllPokemons(listPokemon.results);
    setTypes(listPokemonType.results);
  };

  const toggleSelect = (type: any) => {
    setSelectedTypes((prevSelected: any) => {
      if (prevSelected.includes(type.id)) {
        return prevSelected.filter((item: any) => item !== type.id);
      } else {
        return [...prevSelected, type.id];
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
        {types.length != 0 ? (
          <div className='flex items-center mx-4 my-4'>
            <div className='mr-2 my-4 font-bold self-start'>Types:</div>
            <div>
              {types.map((iType: any, index: number) => (
                <button
                  key={index}
                  onClick={() => toggleSelect(iType)}
                  className={`px-2 py-2 mx-2 my-2 border-2 rounded-md font-bold ${selectedTypes.includes(iType.id)
                    ? 'text-white bg-red-900 border-red-900'
                    : 'text-red-900 border-red-900'
                    }`}
                >
                  {iType.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          'Loading'
        )}
        <div className='my-12 mx-4 font-bold'>
          {pokemons.length == 0
            ? 'No results found'
            : `${pokemons.length} results found`}{' '}
          .
        </div>
      </div>
      {<PokemonList data={currentPokemon} />}
      {pokemons.length > 0 && <div className='mt-8 flex justify-center'>
        <button
          disabled={currentPage == 1}
          onClick={handleBack}
          className={`p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none`}
        >
          Prev
        </button>
        <button
          disabled={currentPage == totalPages}
          onClick={handleNext}
          className={`p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none`}
        >
          Next
        </button>
      </div>
      }

    </main>
  );
};

export default PagePokemon;
