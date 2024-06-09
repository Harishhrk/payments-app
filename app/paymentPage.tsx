import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import { useLocalSearchParams } from 'expo-router';

const PaymentPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { receiverName, receiverDetails } = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const radioButtons = useMemo(() => ([
    { id: '1', label: 'State Bank of India - 9833', value: 'State Bank of India', selected: false },
    { id: '2', label: 'HDFC Bank - 8997', value: 'HDFC Bank', selected: false },
    { id: '3', label: 'Punjab National Bank - 4007', value: 'Punjab National Bank', selected: false },
  ]), []);

  const handlePayment = () => {
    const selectedButton = radioButtons.find(rb => rb.selected);
    if (selectedButton) {
      alert(`Payment of ₹${amount} with message "${message}" to ${receiverName} (${receiverDetails})`);
    } else {
      alert('Please select a bank account');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.receiverInfo}>
        <Ionicons name="person-circle" size={40} color="white" />
        <View style={styles.receiverText}>
          <Text style={styles.receiverName}>{receiverName}</Text>
          <Text style={styles.receiverDetails}>{receiverDetails}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="₹ Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Add a message (optional)"
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>PROCEED TO PAY</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Total Payable</Text>
          <Text style={styles.modalAmount}>₹{amount}</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={(radioButtonsArray) => {
              const selectedButton = radioButtonsArray.find(rb => rb.selected);
              setSelectedId(selectedButton?.id);
            }}
            containerStyle={styles.radioGroup}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handlePayment}>
            <Text style={styles.modalButtonText}>PAY ₹{amount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D0E2D',
    padding: 16,
    paddingBottom: 72,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  receiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A1B3D',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  receiverText: {
    marginLeft: 16,
  },
  receiverName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  receiverDetails: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: '#2A1B3D',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#3A2B4D',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#1D0E2D',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioGroup: {
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
