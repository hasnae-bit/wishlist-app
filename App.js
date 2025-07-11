// App.js 
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import CategoryScreen from './screens/CategoryScreen';
import CategoryItemsScreen from './screens/CategoryItemsScreen'; // Nouveau screen
import DetailScreen from './screens/DetailScreen';
import EditItemScreen from './screens/EditItemScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Détail" 
        component={DetailScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#FF6B9D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="Modifier" 
        component={EditItemScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#FF6B9D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// Stack pour les catégories avec navigation vers les items
function CategoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="CategoryScreen" 
        component={CategoryScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CategoryItems" 
        component={CategoryItemsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Détail" 
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Modifier" 
        component={EditItemScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);
  
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);
  
  if (firstLaunch === null) return null;
  
  return (
    <NavigationContainer>
      {firstLaunch ? (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MainApp" component={MainTabs} />
        </Stack.Navigator>
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF8C42',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          paddingBottom: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Accueil') {
            iconName = 'home';
          } else if (route.name === 'Catégorie') {
            iconName = 'grid';
          } else if (route.name === 'Ajouter') {
            iconName = 'add-circle';
          }
          
          return <Ionicons name={iconName} size={focused ? 32 : 24} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Catégorie" component={CategoryStack} />
      <Tab.Screen name="Ajouter" component={AddItemScreen} />
    </Tab.Navigator>
  );
}