'use client';

import { useEffect, useState } from 'react';
import { IPokemon, IPokemonProps } from './types';

// import Image from "next/image";

const Pokemon = (props: IPokemonProps) => {
  const { id, name, url } = props;
  const [pokemon, setPokenmon] = useState<IPokemon>();

  useEffect(() => {
    _handleFetchPokemonDetail(id);
  }, [id]);

  const _handleFetchPokemonDetail = async (id: number) => {
    try {
      let response: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        {}
      );
      const pokemon: IPokemon = await response.json();
      setPokenmon(pokemon);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='h-24 w-24 mx-auto'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
          title={name}
          width='100'
          height='100'
          loading='lazy'
        ></img>
      </div>
      <div className='text-center'>{name}</div>
    </div>
  );
};

export default Pokemon;
