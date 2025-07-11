import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Linking, 
  StyleSheet, 
  Image, 
  ScrollView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { loadWishlist, saveWishlist } from '../utils/storage';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;

  const deleteItem = async () => {
    Alert.alert("Confirmer", "Supprimer cet article ?", [
      { text: "Annuler" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          const list = await loadWishlist();
          const newList = list.filter(i => i.id !== item.id);
          await saveWishlist(newList);
          navigation.goBack();
        }
      }
    ]);
  };

  const openUrl = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

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
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FF8C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="heart-outline" size={24} color="#FF8C42" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <View style={styles.imageCard}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.imageGradient}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Ionicons name="image-outline" size={48} color="#E8F4FD" />
                </View>
              )}
              <TouchableOpacity style={styles.heartIcon}>
                <Ionicons name="heart" size={20} color="#FF8C42" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Item Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleSection}>
            <View style={styles.titleLeft}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>créé par Vous</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.price}>{item.price} MAD</Text>
            </View>
          </View>

          <Text style={styles.description}>
            {item.desc}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {item.url && (
              <TouchableOpacity 
                style={styles.urlButton}
                onPress={openUrl}
              >
                <LinearGradient
                  colors={['#4A90E2', '#357ABD']}
                  style={styles.urlButtonGradient}
                >
                  <View style={styles.urlButtonContent}>
                    <View style={styles.urlButtonIcon}>
                      <Ionicons name="globe-outline" size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.urlButtonText}>
                      <Text style={styles.urlButtonTitle}>Visiter le site</Text>
                      <Text style={styles.urlButtonSubtitle}>Voir le produit original</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            
            <View style={styles.secondaryButtons}>
              <TouchableOpacity 
                style={[styles.secondaryButton, styles.editButton]}
                onPress={() => navigation.navigate('Modifier', { item })}
              >
                <Ionicons name="create-outline" size={20} color="#4A90E2" />
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.secondaryButton, styles.deleteButton]}
                onPress={deleteItem}
              >
                <Ionicons name="trash-outline" size={20} color="#FF8C42" />
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoRow}>
            <View style={styles.dots}>
              <View style={[styles.dot, { backgroundColor: '#4A90E2' }]} />
              <View style={[styles.dot, { backgroundColor: '#FF8C42' }]} />
              <View style={[styles.dot, { backgroundColor: '#6B8CAE' }]} />
            </View>
            <Text style={styles.infoText}>Ajouté à votre wishlist</Text>
          </View>
        </View>
      </ScrollView>
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A4B7A',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  imageGradient: {
    padding: 30,
    position: 'relative',
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 220,
    height: 220,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 220,
    height: 220,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C42',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B5A87',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B8CAE',
    marginBottom: 12,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF8C42',
  },
  description: {
    fontSize: 16,
    color: '#2B5A87',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButtons: {
    gap: 12,
  },
  urlButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 8,
  },
  urlButtonGradient: {
    padding: 20,
  },
  urlButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  urlButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urlButtonText: {
    flex: 1,
  },
  urlButtonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  urlButtonSubtitle: {
    color: '#E8F4FD',
    fontSize: 14,
    fontWeight: '400',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 140, 66, 0.1)',
    borderColor: 'rgba(255, 140, 66, 0.2)',
  },
  deleteButtonText: {
    color: '#FF8C42',
    fontSize: 16,
    fontWeight: '600',
  },
  additionalInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B8CAE',
  },
});