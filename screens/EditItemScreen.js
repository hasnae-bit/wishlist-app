import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { loadWishlist, saveWishlist } from '../utils/storage';

export default function EditScreen({ route, navigation }) {
  const { item } = route.params;

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [desc, setDesc] = useState(item.desc);
  const [url, setUrl] = useState(item.url || '');
  const [image, setImage] = useState(item.image);

  const openUrl = () => {
    if (url.trim()) {
      Linking.openURL(url.trim());
    } else {
      Alert.alert("Error", "No URL defined");
    }
  };

  const pickImage = () => {
    Alert.alert("Info", "Camera icon pressed — implement image picker here");
  };

  const saveItem = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Product name is required");
      return;
    }

    const list = await loadWishlist();
    const updatedList = list.map(i =>
      i.id === item.id
        ? {
            ...i,
            name: name.trim(),
            price: parseFloat(price) || 0,
            desc: desc.trim(),
            url: url.trim(),
            image
          }
        : i
    );

    await saveWishlist(updatedList);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#A8D5FF" />

      {/* Header Gradient */}
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
        <Text style={styles.headerTitle}>Edit Item</Text>
        <TouchableOpacity onPress={saveItem} >
          <Ionicons name="checkmark" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.imageGradient}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.itemImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Ionicons name="image-outline" size={48} color="#E8F4FD" />
                  {url ? (
                    <TouchableOpacity
                      style={styles.openUrlButton}
                      onPress={openUrl}
                    >
                      <LinearGradient
                        colors={[
                          'rgba(74, 144, 226, 0.1)',
                          'rgba(74, 144, 226, 0.05)'
                        ]}
                        style={styles.openUrlGradient}
                      >
                        <Ionicons name="open-outline" size={20} color="#4A90E2" />
                        <Text style={styles.openUrlText}>Open URL</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <Text style={styles.imageHint}>Tap the icon to change image</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="pricetag-outline" size={20} color="#6B8CAE" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="e.g. iPhone 15 Pro"
                placeholderTextColor="#A8BCCF"
              />
            </View>
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="card-outline" size={20} color="#6B8CAE" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={price}
                onChangeText={setPrice}
                placeholder="0"
                placeholderTextColor="#A8BCCF"
                keyboardType="numeric"
              />
              <Text style={styles.currency}>$</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Ionicons name="document-text-outline" size={20} color="#6B8CAE" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={desc}
                onChangeText={setDesc}
                placeholder="Describe your product..."
                placeholderTextColor="#A8BCCF"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product URL</Text>
            <View style={styles.urlSection}>
              <View style={styles.urlInputContainer}>
                <View style={styles.urlIcon}>
                  <Ionicons name="link-outline" size={20} color="#4A90E2" />
                </View>
                <TextInput
                  style={styles.urlInput}
                  value={url}
                  onChangeText={setUrl}
                  placeholder="https://example.com/product"
                  placeholderTextColor="#A8BCCF"
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </View>
              {url ? (
                <View style={styles.urlPreview}>
                  <TouchableOpacity
                    style={styles.urlPreviewContent}
                    onPress={openUrl}
                  >
                    <View style={styles.urlPreviewIcon}>
                      <Ionicons name="globe" size={16} color="#4A90E2" />
                    </View>
                    <Text style={styles.urlPreviewText} numberOfLines={1}>
                      {url.replace(/^https?:\/\//, '')}
                    </Text>
                    <Ionicons name="open-outline" size={16} color="#4A90E2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.clearUrlButton}
                    onPress={() => setUrl('')}
                  >
                    <Ionicons name="close-circle" size={16} color="#FF8C42" />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <Text style={styles.urlHint}>Paste product URL for quick access</Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
            <LinearGradient
              colors={['#4A90E2', '#357ABD']}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb-outline" size={20} color="#FF8C42" />
            <Text style={styles.tipsTitle}>Tips</Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              Use descriptive names to find your products easily
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              Add the product URL for one‑tap access
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              A detailed description helps compare items
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// (Les styles restent identiques aux exemples précédents)

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
    flex: 100,
    marginLeft:10,
  },
  scrollContainer: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 12,
  },
  imageGradient: {
    padding: 20,
    position: 'relative',
    minHeight: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 140, 66, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C42',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageHint: {
    fontSize: 12,
    color: '#6B8CAE',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 24,
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
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B5A87',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1ECF7',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2B5A87',
    fontWeight: '500',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF8C42',
    marginLeft: 8,
  },
  urlSection: {
    marginBottom: 8,
  },
  urlInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1ECF7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  urlIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  urlInput: {
    flex: 1,
    fontSize: 16,
    color: '#2B5A87',
    fontWeight: '500',
  },
  urlPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  urlPreviewContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlPreviewIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  urlPreviewText: {
    flex: 1,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    marginRight: 8,
  },
  clearUrlButton: {
    padding: 4,
    marginLeft: 8,
  },
  openUrlButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  openUrlGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  openUrlText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  urlHint: {
    fontSize: 12,
    color: '#6B8CAE',
    fontStyle: 'italic',
  },
  saveButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
  },
  saveButtonGradient: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 66, 0.1)',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8C42',
    marginLeft: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF8C42',
    marginTop: 6,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#6B8CAE',
    lineHeight: 20,
  },
});