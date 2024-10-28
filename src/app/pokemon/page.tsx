// 'use client';
import { IPokemon } from "@/components/pokemon/types";
import PagePokemon from "@/components/pagePokemon";

const PokemonPage: React.FC<{ params: any }> = async ({ params }) => {
  const limit = 1200;
  const resPokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const resPokemonTypes: any = await fetch("https://pokeapi.co/api/v2/type/");
  const listPokemon: any = await resPokemons.json();
  const listPokemonType: any = await resPokemonTypes.json();

  async function mergePokemonTypes() {
    try {
      // Fetch Pokémon type data
      const typeResponse = await fetch("https://pokeapi.co/api/v2/type/3");
      const typeData = await typeResponse.json();

      // Fetch Pokémon list data
      const pokemonResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1200"
      );
      const pokemonData = await pokemonResponse.json();

      // Create a map of Pokémon types
      const typeMap: any = {};
      typeData.pokemon.forEach((pokeType: any) => {
        const name = pokeType.pokemon.name;
        if (!typeMap[name]) {
          typeMap[name] = [];
        }
        typeMap[name].push("Flying");
      });

      // Merge types into Pokémon list
      const mergedPokemonList = pokemonData.results.map((pokemon: any) => {
        const pokemonName = pokemon.name;
        return {
          ...pokemon,
          types: typeMap[pokemonName] || [],
        };
      });

      console.log("mergedPokemonList", mergedPokemonList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the function to execute
  await mergePokemonTypes();

  return (
    <PagePokemon
      types={listPokemonType.results}
      pokemons={listPokemon.results}
    />
  );
};

export default PokemonPage;
