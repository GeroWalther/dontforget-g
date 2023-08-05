import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Btn from './uiUtils/Btn';
import { Octicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

const hours = Array.from({ length: 24 }, (_, index) => ({
  label: index.toString().padStart(2, '0'),
  value: index,
}));

const minutes = Array.from({ length: 60 }, (_, index) => ({
  label: index.toString().padStart(2, '0'),
  value: index,
}));

const ReminderModal = ({
  isVisible,
  onClose,
  onConfirm,
  mode = 'datetime',
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 60000 * 5)
  );
  const [timer, setTimer] = useState({ hrs: 0, mins: 0, sec: 1 });
  const [showDate, setShowDate] = useState(false);

  const toggleReminder = () => {
    setShowDate((s) => !s);
  };

  const handleDateTimeChange = (event, selected) => {
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const handleModalConfirm = () => {
    if (showDate) {
      onConfirm(selectedDate);
      onClose();
      return;
    } else {
      onConfirm(timer);
      onClose();
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.modalContent]}>
        <View style={styles.btnGr}>
          <Text style={styles.modalTitle}>
            {!showDate ? 'Set a timer' : 'Select a date'}
          </Text>
          <Octicons
            name='arrow-switch'
            size={24}
            color='#308fe3'
            onPress={toggleReminder}
          />
        </View>
        {showDate ? (
          <DateTimePicker
            value={selectedDate || new Date(Date.now() + 120000)}
            mode={mode}
            is24Hour={false}
            display='default'
            minimumDate={new Date(Date.now() + 120000)}
            onChange={handleDateTimeChange}
          />
        ) : (
          <View style={styles.pickerContainer}>
            <View style={styles.pickerLabel}>
              <Text style={styles.pickerLabelTxt}>Hours</Text>
              <Text style={styles.pickerLabelTxt}>Minutes</Text>
              <Text style={styles.pickerLabelTxt}>Seconds</Text>
            </View>
            <View style={styles.pickerTimer}>
              <RNPickerSelect
                style={pickerSelectStyles}
                items={hours}
                onValueChange={(value) => {
                  if (value !== '') {
                    setTimer((prevTimer) => ({
                      ...prevTimer,
                      hrs: value,
                    }));
                  }
                }}
                value={timer.hrs}
                placeholder={{
                  label: 'Set Seconds',
                  value: '',
                  color: '#9EA0A4',
                  disabled: true,
                }}
              />

              <RNPickerSelect
                style={pickerSelectStyles}
                items={minutes}
                onValueChange={(value) => {
                  if (value !== '') {
                    setTimer((prevTimer) => ({
                      ...prevTimer,
                      mins: value,
                    }));
                  }
                }}
                value={timer.mins && timer.mins}
                placeholder={{
                  label: 'Set Minutes',
                  value: '',
                  color: '#9EA0A4',
                  disabled: true,
                }}
              />

              <RNPickerSelect
                style={pickerSelectStyles}
                items={minutes}
                onValueChange={(value) => {
                  if (
                    (value !== '' && timer.hrs !== 0) ||
                    timer.mins !== 0 ||
                    value > 0
                  ) {
                    setTimer((prevTimer) => ({
                      ...prevTimer,
                      sec: value,
                    }));
                  }
                }}
                value={timer.sec}
                placeholder={{
                  label: 'Set Seconds',
                  value: '',
                  color: '#9EA0A4',
                  disabled: true,
                }}
              />
            </View>
          </View>
        )}

        <View style={styles.btnGr}>
          <Btn style={styles.cancelBtn} txtColor={'#ffebb3'} onPress={onClose}>
            Cancel
          </Btn>
          <Btn style={styles.confirmBtn} onPress={handleModalConfirm}>
            Confirm
          </Btn>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnGr: {
    flexDirection: 'row',
    gap: 28,
  },
  cancelBtn: {
    backgroundColor: '#b71f1f',
  },
  confirmBtn: {
    backgroundColor: '#30e395',
  },
  modalContent: {
    backgroundColor: '#ffebb3',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    paddingVertical: 25,
  },
  pickerContainer: {
    alignItems: 'center',
    gap: 30,
  },
  pickerLabel: {
    flexDirection: 'row',
    gap: 55,
  },
  pickerLabelTxt: {
    color: '#5a3e2b',
    fontWeight: 'bold',
  },
  pickerTimer: {
    flexDirection: 'row',
    gap: 70,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#5a3e2b',
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputAndroid: {
    color: '#5a3e2b',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default ReminderModal;
