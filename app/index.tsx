import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function App() {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handlePayment = () => {
    if (amount && cardNumber) {
      // Here you can add your payment processing logic
      alert(
        `Payment Successful\nAmount: ${amount}\nCard Number: ${cardNumber}`
      );
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.headerText}>Add Address</Text>
        </View>
        <View style={styles.headerLeft}>
            <Link href="/scanner">
            <Ionicons name="qr-code-outline" size={24} color="white" />
            </Link>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="white"
            style={styles.notificationIcon}
          />
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Get access to Personal Loan up to Rs. 40 lakh
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transfer Money</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="phone-portrait-outline" size={32} color="white" />
            <Text style={styles.gridItemText}>To Mobile Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="wallet-outline" size={32} color="white" />
            <Text style={styles.gridItemText}>To Bank/UPI ID</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <MaterialCommunityIcons
              name="bank-transfer"
              size={32}
              color="white"
            />
            <Text style={styles.gridItemText}>To Self Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <MaterialCommunityIcons
              name="bank-outline"
              size={32}
              color="white"
            />
            <Text style={styles.gridItemText}>Check Bank Balance</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My QR</Text>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>UPI ID: harishhrk@ybl</Text>
          <Ionicons name="qr-code-outline" size={24} color="white" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter card number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <Button title="Submit Payment" onPress={handlePayment} />
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D21",
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 14,
    borderRadius: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Adjust as needed
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  banner: {
    backgroundColor: "#FF9800",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  bannerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#1F1F3A",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#6200EE",
    width: "48%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  gridItemText: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 16,
    borderRadius: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationIcon: {
    marginLeft: 10,
  },
});
