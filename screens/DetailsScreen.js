import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { FavoritesContext } from '../FavoritesContext';

export default function DetailsScreen({ route }) {
  const { cocktail } = route.params;
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);

  return (
    <View style={styles.container}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      <Button
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={() => {
          if (isFavorite) {
            removeFavorite(cocktail.idDrink);
          } else {
            addFavorite(cocktail);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  instructions: {
    fontSize: 16,
  },
});
