import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Pressable,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';

import ReminderModal from './ReminderModal';
import { Entypo } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const Item = ({ item, onDeleteItem, onTogglePacking }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const scheduleNotification = async (selectedDateorTimer) => {
    try {
      let triggerDate;

      if (selectedDateorTimer instanceof Date) {
        triggerDate = selectedDateorTimer;
      } else {
        const { hrs, mins, sec } = selectedDateorTimer;
        const totalMilliseconds = (hrs * 3600 + mins * 60 + sec) * 1000;
        triggerDate = new Date(Date.now() + totalMilliseconds);
      }

      const schedulingOptions = {
        content: {
          title: 'don’t forget',
          body: `Reminder for: *${item.input}*`,
          sound: true,
        },
        trigger: {
          date: triggerDate,
        },
      };

      if (Platform.OS === 'android') {
        schedulingOptions.android = {
          channelId: 'reminders',
        };
      }

      await Notifications.scheduleNotificationAsync(schedulingOptions);

      Toast.show({
        type: 'success',
        text1: 'Reminder Set Successfully!',
        text2: `Reminder set for ${triggerDate.toLocaleString()}`,
        position: 'top',
      });
    } catch (error) {
      console.log('Error scheduling local notification:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Selected Date must be in the future. Please try again.',
        position: 'top',
      });
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = (selectedDate) => {
    scheduleNotification(selectedDate);
  };

  const handleTogglePacking = () => {
    onTogglePacking(item.id);
  };

  const handleDeleteItem = () => {
    onDeleteItem(item.id);
  };

  return (
    <View style={styles.container}>
      <Switch
        value={item.packed}
        onValueChange={handleTogglePacking}
        style={styles.switch}
      />
      <Pressable style={styles.itemTextContainer} onPress={handleTogglePacking}>
        <Text style={[styles.itemText, item.packed && styles.itemTextPacked]}>
          {item.select ? item.select : null}
          {item.select ? 'x  ' : ''}
          {item.input}
        </Text>
      </Pressable>
      {!item.packed && (
        <Pressable onPress={openModal}>
          <Entypo name='back-in-time' size={30} color='#30a271' />
        </Pressable>
      )}
      <Pressable style={styles.deleteButton} onPress={handleDeleteItem}>
        <Text style={styles.deleteButtonText}>❌</Text>
      </Pressable>

      <ReminderModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  switch: {
    marginLeft: 10,
    marginRight: '5%',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
  },
  itemTextPacked: {
    textDecorationLine: 'line-through',
    color: '#5a3e2b',
  },
  deleteButton: {
    marginLeft: 15,
  },
  deleteButtonText: {
    fontSize: 20,
    color: 'red',
  },
});

export default Item;
