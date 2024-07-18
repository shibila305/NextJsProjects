"use  client"
import { useState } from "react";
import Pokemon from "./Pokemon";
import { pokemonData } from "./pokemonData";

export default function App() {
  const IDLE = "idle";
  const LOADED = "loaded";
  const LOADING = "loading";
  const [status, setStatus] = useState(IDLE);
  const [pokeList, setPokeList] = useState([]);

  async function fetchPokemonList() {
    setStatus(LOADING);
    const response = pokemonData.map(async (data) => {
      const a = await fetch(data.url);
      console.log(a);
      const readablejson = await a.json();
      // console.log(readablejson);
      const { name, height, weight, id, sprites, types } = readablejson;
      return { name, height, weight, id, sprites, types };
    });
    let newresponse = await Promise.all(response);
    console.log(newresponse);
    setPokeList(newresponse);
    setStatus(LOADED);
    setTimeout(() => {}, 2000);
  }

  if (status === IDLE)
    return <button onClick={() => fetchPokemonList()}>Fetch Pokemon</button>;

  if (status === LOADING) return <div className="pokemon-loader"></div>;

  return (
    status === LOADED && (
      <ul className="poke-list">
        {pokeList.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    )
  );
}
