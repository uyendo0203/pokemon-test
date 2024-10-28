'use client';
import Pokemon from '@/components/pokemon';

const _handleGetPokemonId = (url: string) => {
  const regex = /\/(\d+)\//; // Regex to capture digits between slashes
  const match = url.match(regex);

  if (match) {
    const id: number = parseInt(match[1]); // The captured group
    // console.log(id); // Outputs: 401
    return id;
  }

  return 0;
};

const PokemonList = ({ data }: any) => {
  const listPokemon: any = data.map((iPoke: any) => {
    return {
      ...iPoke,
      id: _handleGetPokemonId(iPoke.url),
    };
  });

  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
      {listPokemon.map((poke: any) => (
        <Pokemon key={poke.id} id={poke.id} name={poke.name} url={poke.url} />
      ))}
    </div>
  );
};
export default PokemonList;
