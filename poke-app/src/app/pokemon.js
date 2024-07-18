function Type({ type }) {
    return <span class="poke-type">{type}</span>;
  }
  
  export default function Pokemon({ pokemon }) {
    const { name, height, weight, id, sprites, types } = pokemon;
    const img = sprites.other.dream_world.front_default;
  
    return (
      <li className="poke-item">
        <img alt={name} width="200px" height="200px" src={img} />
        <h2>{name}</h2>
        <p>
          <b>Height:{height}</b>
        </p>
        <p>
          <b>Weight: {weight}</b>
        </p>
        <p>
          <b>Types:</b>
          {types.map((type, index) => (
            <Type key={index} type={type.type.name} />
          ))}
        </p>
      </li>
    );
  }
  