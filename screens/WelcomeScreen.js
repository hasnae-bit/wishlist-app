import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LinearGradient,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E8D5E8" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#F5F0F5', '#E8D5E8', '#DCC4DC']}
        style={styles.backgroundGradient}
      />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        
        {/* Top Section with Roses */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop' }}
            style={styles.rosesImage}
            resizeMode="cover"
          />
          {/* Decorative overlay for softer effect */}
          <View style={styles.imageOverlay} />
        </View>

        {/* Welcome Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>
            Explore our beautiful bouquets for{'\n'}
            every occasion
          </Text>
        </View>

        {/* Bottom Section with Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0F5',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rosesImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    shadowColor: '#B19CD9',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 15,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(220, 196, 220, 0.1)',
    borderRadius: (width * 0.7) / 2,
  },
  textSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4A3B4F',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7B6B7D',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    paddingHorizontal: 20,
  },
  buttonSection: {
    flex: 0.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#6B4B7A',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: width * 0.8,
    alignItems: 'center',
    shadowColor: '#6B4B7A',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    color: '#7B6B7D',
    fontSize: 14,
    fontWeight: '400',
  },
  signInLink: {
    color: '#6B4B7A',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(177, 156, 217, 0.15)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 150,
    left: -60,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(220, 196, 220, 0.2)',
  },
});