import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import { Link } from "@material-ui/core";

const toFirstCharUppercase = (name) =>
   name.charAt(0).toUpperCase() + name.slice(1);

const Pokemon = (props) => {
   const id = useParams().pokemonId;
   const { history } = props;
   const [pokemon, setPokemon] = useState(undefined);
   useEffect(() => {
      axios
         .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
         .then(function (response) {
            const { data } = response;
            setPokemon(data);
         })
         .catch(function (error) {
            setPokemon(false);
         });
   }, [id]);

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
   return (
      <>
         {pokemon === undefined && <CircularProgress />}
         {pokemon !== undefined && pokemon && generatePokemonJsx()}
         {pokemon === false && <Typography>Pokemon not found</Typography>}
         {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push("/")}>
               back to pokedex
            </Button>
         )}
      </>
   );
};

export default Pokemon;
