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
    Alert.alert("Confirm", "Delete this item?", [
      { text: "Cancel" },
      {
        text: "Delete",
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
          onPress={() => navigation.goBack()}
        >
    <Ionicons name="chevron-back" size={24} color="#FF8C42" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}> Item Details</Text>
        
        <TouchableOpacity >
          <Ionicons name="heart-outline" size={24} color="#FF8C42" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image Container - Centré comme dans l'image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={60} color="#ccc" />
            </View>
          )}
        </View>

        {/* Product Details Card - Design blanc et clean */}
        <View style={styles.detailsCard}>
          {/* Title */}
          <Text style={styles.title}>{item.name}</Text>
          
          {/* Price with Buy button */}
       <View style={styles.priceRow}>
  <Text style={styles.price}>Price: ${item.price}</Text>
  <TouchableOpacity 
    style={styles.buyCircleButton}
    onPress={() => {
      Alert.alert("Buy Now", "Redirect to purchase page?", [
        { text: "Cancel" },
        { text: "Go", onPress: openUrl }
      ]);
    }}
  >
    <Ionicons name="bag-outline" size={20} color="#3B82F6" />

  </TouchableOpacity>
</View>

          {/* Description */}
          <Text style={styles.description}>
            {item.desc || "Premium imported product\n100% authentic quality\nShipped to your door with best care\nShipping worldwide"}
          </Text>

          
          {/* Action Buttons - Edit + Delete alignés côte à côte */}
<View style={styles.bottomButtons}>
  {/* Edit Button (pink icon only) */}
  <TouchableOpacity
    style={styles.editButton}
    onPress={() => navigation.navigate('Modifier', { item })}
  >
    <Ionicons name="create-outline" size={20} color="#FFFFFF" />
  </TouchableOpacity>

  {/* Delete Button (green with icon + text) */}
  <TouchableOpacity
    style={styles.deleteButton}
    onPress={deleteItem}
  >
    <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
    <Text style={styles.deleteButtonText}>Delete</Text>
  </TouchableOpacity>
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
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
    headerTitle: {
    fontSize: 20,
    fontWeight: '600',

    color: '#1A4B7A',
    
    textAlign: 'left',
    flex: 100,
    marginLeft:10,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  itemImage: {
    width: 350,
    height: 260,
    borderRadius: 15,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  placeholderImage: {
    width: 250,
    height: 250,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,

 
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#666',

    marginBottom: 8,
    textAlign: 'left',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  color: '#4A90E2',
    marginBottom: 15,
  },
  priceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},

buyCircleButton: {
  width: 45,
  height: 45,
  borderRadius: 22.5,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#3B82F6',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
    borderWidth: 0.5,
  borderColor: '#3B82F6',
  shadowRadius: 4,
  
  elevation: 3,
},
  description: {
    fontSize: 14,
    color: '#666',
    
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  urlContainer: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  urlText: {
    fontSize: 12,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
 
bottomButtons: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  marginTop: 20,
},

editButton: {
  width: 90,
  height: 50,
  borderRadius: 12,
  backgroundColor: '#FB923C',

  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#FF6B6B',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

deleteButton: {
   width: 250,
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#3B82F6',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 16,
  gap: 8,
  shadowColor: '#34D399',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 4,
},

deleteButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},

});