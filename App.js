import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Form from './components/Form';
import Logo from './components/Logo';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

// Create a notification channel for Android
if (Platform.OS === 'android') {
  useEffect(() => {
    Notifications.setNotificationChannelAsync('reminders', {
      name: 'Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
    });
  }, []);
}

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#30a271' }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: 400,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  successToast: ({ text1, props }) => (
    <View style={{ height: '10%', width: '90%', backgroundColor: '#30a271' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (items !== []) saveState();
  }, [items]);

  const loadState = async () => {
    try {
      // Load the saved state from local storage
      const savedState = await AsyncStorage.getItem('appState');
      if (savedState !== null) {
        const { items: savedItems } = JSON.parse(savedState);
        setItems(savedItems);
      }
    } catch (error) {
      console.log('Error loading state from local storage:', error);
    }
  };

  const saveState = async () => {
    try {
      const appState = JSON.stringify({ items });
      await AsyncStorage.setItem('appState', appState);
    } catch (error) {
      console.log('Error saving state to local storage:', error);
    }
  };

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((e) => (e.id === id ? { ...e, packed: !e.packed } : e))
    );
  }

  function handleClearAll() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to clear all?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setItems([]),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onTogglePacking={handleToggleItem}
        clearAll={handleClearAll}
      />
      <Stats items={items} />
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4a226',
    alignItems: 'center',
  },
});
