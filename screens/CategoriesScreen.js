import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadCocktailsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategories(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCocktailsByCategory = async (category) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item.strCategory)}>
      <Text style={styles.category}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  const renderCocktail = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { cocktail: item })}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.strCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      />
      <FlatList
        data={cocktails}
        renderItem={renderCocktail}
        keyExtractor={(item) => item.idDrink}
        style={styles.cocktails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categories: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  category: {
    marginRight: 10,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    alignSelf: 'center',
  },
  cocktails: {
    paddingHorizontal: 20,
  },
});
