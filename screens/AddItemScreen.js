import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveWishlist, loadWishlist } from '../utils/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = [
  '#FF6FA4', '#FF9F68', '#FFD36E', '#B1E693', '#6FC3FF',
  '#B06FFF', '#FF6FD8', '#A1A1A1', '#2B2B2B'
];

const CATEGORIES = ['Works', 'Travel', 'Studying'];

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#FF6FA4');
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('Works');

  // Clear form when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setName('');
      setDesc('');
      setPrice('');
      setUrl('');
      setImage(null);
      setColor('#FF6FA4');
      setDeadline(null);
      setCategory('Works');
    }, [])
  );

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert('Required Fields', 'Name and Estimated Price are required.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      desc,
      price,
      url,
      image,
      color,
      category,
      deadline: deadline ? deadline.toISOString() : null,
    };

    const list = await loadWishlist();
    const updatedList = [...list, newItem];
    await saveWishlist(updatedList);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#6B9FE8', '#B8D4F0', '#FFFFFF']}
        locations={[0, 0.3, 0.7]}
        style={styles.backgroundGradient}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FF8C42" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Create A New Wish</Text>
        <View style={styles.headerButton} />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroImageContainer}>
          <Image
              source={require('../assets/add.png')}
            style={styles.heroImage}
          />
        </View>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Category Selection */}
          <Text style={styles.sectionTitle}>New Wish</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton, 
                  category === cat && styles.categorySelected
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Product Name */}
          <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter item name"
            placeholderTextColor="#B0B0B0"
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={desc}
            onChangeText={setDesc}
            placeholder="Enter item description (optional)"
            placeholderTextColor="#B0B0B0"
          />

          {/* Price */}
          <Text style={styles.label}>Estimated Price <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter estimated price"
            keyboardType="numeric"
            placeholderTextColor="#B0B0B0"
          />

          {/* URL */}
          <Text style={styles.label}>Product URL</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            placeholder="Enter product link (optional)"
            placeholderTextColor="#B0B0B0"
            keyboardType="url"
          />

          {/* Date Range */}
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar" size={16} color="#FF8C42" />
                <Text style={styles.dateText}>
                  {deadline ? deadline.toLocaleDateString() : '5 Jan 2024'}
                </Text>
              </TouchableOpacity>
            </View>
            
         
          </View>

          {/* Remind Me Toggle */}
          <View style={styles.remindContainer}>
            <View style={styles.remindLeft}>
              <Ionicons name="notifications" size={20} color="#FF8C42" />
              <Text style={styles.remindText}>Remind Me</Text>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <View style={styles.toggleTrack}>
                <View style={styles.toggleThumb} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Color Selection */}
          {/* <Text style={styles.label}>Select the color for your wish</Text>
          <View style={styles.colorPalette}>
            {COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorCircle,
                  { backgroundColor: c },
                  color === c && styles.selectedColor
                ]}
                onPress={() => setColor(c)}
              />
            ))}
          </View> */}

          {/* Image Selection */}
          <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
            <Ionicons name="image" size={20} color="#B0B0B0" />
            <Text style={styles.imagePickerText}>Add Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.preview} />}

          {/* Save Button */}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <LinearGradient
              colors={['#FF8C42', '#FF6B1A']}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={deadline || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDeadline(selectedDate);
          }}
        />
      )}
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
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40, height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A4B7A',
    textAlign: 'left',
    flex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
  },
  heroSection: {
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  heroImageContainer: {
    position: 'relative',
    width: 150,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
  },
  circle1: {
    width: 60,
    height: 60,
    top: 80,
    left: 5,
    backgroundColor: 'rgba(255, 140, 66, 0.3)',
  },
  circle2: {
    width: 40,
    height: 40,
    bottom: -125,
    right: -40,
    backgroundColor: 'rgba(168, 213, 255, 0.4)',
  },
  heroImage: {
    width: 170,
    height: 170,
    alignSelf: 'flex-end',
    marginLeft: 10,
    marginBottom:60
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF8C42',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 30,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categorySelected: {
    backgroundColor: '#FF8C42',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  required: {
    color: '#FF4444',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0D1',
    gap: 8,
  },
  dateText: {
    color: '#FF8C42',
    fontSize: 14,
    fontWeight: '500',
  },
  remindContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  remindLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  remindText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  toggleButton: {
    padding: 2,
  },
  toggleTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF8C42',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#333',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 10,
    marginTop: 10,
  },
  imagePickerText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 15,
  },
  saveButton: {
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});