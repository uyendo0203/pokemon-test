// 'use client'
import { ITypePokemon } from "@/app/pokemon/types";
// import { useEffect } from "react";

const PokemonType = (props: any) => {
  console.log("PokemonType", props);

  // useEffect(() => {
  //   _handleFetchAllPokemonType();
  // }, []);

  // const fetchListPokemonByType = async (url: string) => {
  //   return await fetch(url).then((res) => res.json());
  // };

  // const _handleFetchAllPokemonType = async () => {
  //   let res: any = await Promise.all(
  //     props.data.map((iPoke: any) => fetchListPokemonByType(iPoke.url))
  //   );
  //   console.log(res);
  // };

  const listPokemonType: any = props.data;
  // await fetch(iPoke.url)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  const _handleChangeType = (type: any) => {
    try {
    } catch (error) {}
  };
  return (
    <div className="flex items-center mx-4 my-4">
      <div className="mr-2 my-4 font-bold self-start">Types:</div>
      <div>
        {listPokemonType.map((value: ITypePokemon, index: number) => {
          return (
            <button
              key={index}
              onClick={() => _handleChangeType(value.id)}
              className="px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900"
            >
              {value.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonType;
