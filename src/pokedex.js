import React, { useState, useEffect } from "react";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
   pokedexContainer: {
      paddingTop: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
   },
   cardMedia: {
      margin: "auto",
   },
});

const toFirstCharUppercase = (name) =>
   name.charAt(0).toUpperCase() + name.slice(1);

const Pokedex = (props) => {
   useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`).then((res) => {
         const {
            data: { results },
         } = res;
         const newPokemonData = {};
         results.forEach((pokemon, idx) => {
            newPokemonData[idx + 1] = {
               id: idx + 1,
               name: pokemon.name,
               sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  idx + 1
               }.png`,
            };
         });
         setPokemonData(newPokemonData);
      });
   }, []);

   const { history } = props;
   const [pokemonData, setPokemonData] = useState({});
   const classes = useStyles();
   const getPokemonCard = (pokemonId) => {
      const { id, name, sprite } = pokemonData[pokemonId];

      return (
         <Grid item xs={12} sm={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${pokemonId}`)}>
               <CardMedia
                  image={sprite}
                  style={{ width: "130px", height: "130px" }}
                  className={classes.cardMedia}
               />
               <CardContent>
                  <Typography align="center">{`${id}. ${toFirstCharUppercase(
                     name
                  )}`}</Typography>
               </CardContent>
            </Card>
         </Grid>
      );
   };

   return (
      <>
         <AppBar position="static">
            <Toolbar />
         </AppBar>
         <Grid container className={classes.pokedexContainer} spacing={4}>
            {pokemonData ? (
               Object.keys(pokemonData).map((PokemonId) => {
                  return getPokemonCard(PokemonId);
               })
            ) : (
               <CircularProgress />
            )}
         </Grid>
      </>
   );
};

export default Pokedex;
