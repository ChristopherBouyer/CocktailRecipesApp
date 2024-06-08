import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoritesContext } from '../FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(FavoritesContext);

  const renderCocktail = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { cocktail: item })}>
      <View style={styles.item}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <Text style={styles.text}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.message}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderCocktail}
          keyExtractor={(item) => item.idDrink}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});
