import React, { useState } from "react";
import { useParams } from "react-router";
import mockData from "./mock-data";
import { Typography } from "@material-ui/core";
import { Link } from "@material-ui/core";

const toFirstCharUppercase = (name) =>
   name.charAt(0).toUpperCase() + name.slice(1);

const Pokemon = () => {
   const id = useParams().pokemonId;
   const [pokemon, setPokemon] = useState(mockData[`${id}`]);
   const generatePokemonJsx = () => {
      const { name, id, species, height, weight, types, sprites } = pokemon;

      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      const { front_default } = sprites;
      return (
         <>
            <Typography variant="h1">
               {`${id}. ${toFirstCharUppercase(name)}`}
               <img src={front_default} alt={name} />
            </Typography>
            <img
               src={fullImageUrl}
               alt={name}
               style={{ width: "300px", height: "300px" }}
            />
            <Typography variant="h3">Pokemon Info</Typography>
            <Typography>
               {"Species: "}
               <Link href={species.url}>{species.name}</Link>
            </Typography>
            <Typography>weight: {weight}</Typography>
            <Typography>height: {height}</Typography>
            <Typography variant="h6">
               Types:
               {types.map((typeInfo) => {
                  const {
                     type: { name },
                  } = typeInfo;
                  return <Typography key={name}>{name}</Typography>;
               })}
            </Typography>
         </>
      );
   };
   return <> {generatePokemonJsx()}</>;
};

export default Pokemon;
