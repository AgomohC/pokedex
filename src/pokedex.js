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
import mockData from "./mock-data";

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
   const { history } = props;
   const [pokemonData, setPokemonData] = useState(mockData);
   const classes = useStyles();
   const getPokemonCard = (pokemonId) => {
      const { id, name } = pokemonData[`${pokemonId}`];
      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
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
