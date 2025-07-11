import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useIsFocused } from '@react-navigation/native';
import { loadWishlist, saveWishlist } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [wishlist, setWishlist] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log("🔄 Rechargement de la liste depuis AsyncStorage");
      loadWishlist().then(setWishlist);
    }
  }, [isFocused]);

  const confirmDelete = (item) => {
    Alert.alert("Supprimer", `Supprimer ${item.name} ?`, [
      { text: "Annuler" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          const list = await loadWishlist();
          const newList = list.filter(i => i.id !== item.id);
          await saveWishlist(newList);
          setWishlist(newList);
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Détail', { item })}
      onLongPress={() => confirmDelete(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemCategory}>Wishlist</Text>
      </View>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#A8D5FF" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#A8D5FF', '#E8F4FD', '#FFFFFF']}
        locations={[0, 0.4, 1]}
        style={styles.backgroundGradient}
      />
      
   {/* Header */}
<View style={styles.header}>
  <TouchableOpacity style={styles.headerButton}>
    <Ionicons name="chevron-back" size={24} color="#FF8C42" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>My Wish List</Text>
  <View style={styles.headerButton} />
</View>


    

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Custom Feature Card */}
        <View style={styles.featureCard}>
          <LinearGradient
            colors={['#4A90E2', '#357ABD']}
            style={styles.featureGradient}
          >
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Customize Wishlist</Text>
              <Text style={styles.featureSubtitle}>
                With the help of custom feature{'\n'}
                create customized wishlist{'\n'}
                for your loved ones.
              </Text>
            </View>
            <View style={styles.featureImageContainer}>
              <Image
              source={require('../assets/image1.png')}
                style={styles.featureImage}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Wishlist </Text>
            <Text style={styles.sectionSubtitle}>Items, Gifts and many more...</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Ionicons name="chevron-forward" size={20} color="#2B5A87" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.activeCategory}>
            <LinearGradient
              colors={['#FF8C42', '#FF6B1A']}
              style={styles.activeCategoryGradient}
            >
              <Text style={styles.activeCategoryText}>Items</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Gifts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Others</Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        {wishlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/11.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>Aucun article pour le moment</Text>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {wishlist.map((item) => (
              <View key={item.id.toString()}>
                {renderItem({ item })}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Ajouter')}
        style={styles.fab}
      >
        <LinearGradient
          colors={['#FF8C42', '#FF6B1A']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A4B7A',
    textAlign: 'left',
    flex: 1,
  },

  // Nouveaux styles pour la section hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  heroImageContainer: {
    position: 'relative',
    width: 200,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },

   heroImage: {
    width: 180,
    height: 230,
    borderRadius: 20,
    zIndex: 2,
  },

  // checkCircle: {
  //   position: 'absolute',
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   backgroundColor: '#FF8C42',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   top: 80,
  //   left: 20,
  //   zIndex: 3,
  //   shadowColor: '#FF8C42',
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
 
  versionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featureCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  featureGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#E8F4FD',
    lineHeight: 20,
  },
  featureImageContainer: {
    // width: 80,
    // height: 80,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  featureImage: {
    width: 80,
    height: 80,

  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2B5A87',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B8CAE',
    marginTop: 4,
  },
  seeAllButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(232, 244, 253, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activeCategory: {
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#FF8C42',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  activeCategoryGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  category: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  categoryText: {
    color: '#6B8CAE',
    fontSize: 14,
    fontWeight: '500',
  },
  itemsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B5A87',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6B8CAE',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF8C42',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6B8CAE',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: '#FF8C42',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});