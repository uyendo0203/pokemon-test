// 'use client';
import { IPokemon } from '@/components/pokemon/types';
import PagePokemon from '@/components/pagePokemon';

const PokemonPage: React.FC<{ params: any }> = async ({ params }) => {
  return <PagePokemon />;
};

export default PokemonPage;
