// screens/CategoryItemsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { loadWishlist, saveWishlist } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

const CategoryItemsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [wishlist, setWishlist] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [category])
  );

  const loadData = async () => {
    try {
      const data = await loadWishlist();
      setWishlist(data);
      const filtered = data.filter(item => item.category === category.name);
      setFilteredItems(filtered);
    } catch (error) {
      console.error('Loading error:', error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedList = wishlist.filter(item => item.id !== id);
            await saveWishlist(updatedList);
            loadData();
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemCard, { backgroundColor: item.color || category.color }]}
      onPress={() => navigation.navigate('Détail', { item })}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {item.desc && (
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.desc}
          </Text>
        )}

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>{item.price}€</Text>
          {item.deadline && (
            <Text style={styles.itemDeadline}>
              {new Date(item.deadline).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#A8D5FF" />
      <LinearGradient
        colors={['#A8D5FF', '#E8F4FD', '#FFFFFF']}
        locations={[0, 0.4, 1]}
        style={styles.backgroundGradient}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FF8C42" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Ionicons name={category.icon} size={24} color={category.color} />
          <Text style={styles.headerText}>{category.name}</Text>
        </View>

        
      </View>

      {/* Content */}
      <View style={styles.content}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name={category.icon} size={80} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>No items in {category.name}</Text>
            <Text style={styles.emptySubtitle}>
              Start by adding items to your wishlist!
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Ajouter')}
            >
              <LinearGradient
                colors={[category.color, category.color + '80']}
                style={styles.addButtonGradient}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text style={styles.addButtonText}>Add a wish</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A4B7A',
    marginLeft: 10,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemCard: {
    borderRadius: 20,
    marginBottom: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  itemDeadline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginLeft: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CategoryItemsScreen;
