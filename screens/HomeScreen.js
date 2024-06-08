import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadCocktails();
  }, [page]);

  const loadCocktails = async () => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`);
      setCocktails([...cocktails, ...response.data.drinks]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCocktail = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { cocktail: item })}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Image source={{ uri: item.strDrinkThumb }} style={{ width: 50, height: 50 }} />
        <Text style={{ marginLeft: 10 }}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={cocktails}
      renderItem={renderCocktail}
      keyExtractor={(item) => item.idDrink}
      onEndReached={() => setPage(page + 1)}
      onEndReachedThreshold={0.5}
    />
  );
}
