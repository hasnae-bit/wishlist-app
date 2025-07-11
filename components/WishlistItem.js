import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WishlistItem({ item, onPress, onLongPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} onLongPress={onLongPress}>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} MAD</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6FA4',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});
