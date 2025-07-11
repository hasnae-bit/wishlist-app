// screens/CategoryScreen.js
import React from 'react';
import {
  View,
  Text,
    Image,

  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CategoryScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Shopping', icon: 'briefcase', color: '#FF8C42' },

    { id: 2, name: 'Travel', icon: 'airplane', color: '#4ECDC4' },
    { id: 3, name: 'Studying', icon: 'book', color: '#45B7D1' },
  ];

  const handleCategoryPress = (category) => {
    // Navigation vers une liste filtrée par catégorie
    navigation.navigate('CategoryItems', { category });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#A8D5FF" />
      
      {/* Background Gradient - Same as HomeScreen */}
     <LinearGradient
            colors={['#A8D5FF', '#E8F4FD', '#FFFFFF']}
            locations={[0, 0.4, 1]}
            style={styles.backgroundGradient}
          />
      {/* Header - Same as HomeScreen */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FF8C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catégories</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Header */}
           <View style={styles.featureCard}>
  <LinearGradient
    colors={['#4A90E2', '#357ABD']}
    style={styles.featureGradient}
  >
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>Personalize Your Wishlist</Text>
      <Text style={styles.featureSubtitle}>
        Use custom categories to{'\n'}
        create personalized wishlists{'\n'}
        for any occasion or loved one.
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

{/* Section Title */}
<View style={styles.sectionHeader}>
  <View>
    <Text style={styles.sectionTitle}>Your Categories</Text>
    <Text style={styles.sectionSubtitle}>Manage gifts, travels, and goals...</Text>
  </View>
</View>


        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={40} color="white" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
   featureImage: {
    width: 100,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A4B7A',
    textAlign: 'left',
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryIcon: {
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default CategoryScreen;