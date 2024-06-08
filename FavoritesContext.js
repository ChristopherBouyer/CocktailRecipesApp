import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addFavorite = async (cocktail) => {
    const newFavorites = [...favorites, cocktail];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = async (id) => {
    const newFavorites = favorites.filter(cocktail => cocktail.idDrink !== id);
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
