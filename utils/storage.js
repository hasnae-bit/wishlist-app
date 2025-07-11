import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@wishlist';

export const saveWishlist = async (list) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erreur sauvegarde', e);
  }
};

export const loadWishlist = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erreur chargement', e);
    return [];
  }
};
