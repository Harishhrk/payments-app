import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { width, height } = Dimensions.get("window");
  const squareSize = Math.min(width, height) * 0.6; // Set the square size to 60% of the smaller dimension
  const topHeight = (height - squareSize) / 2;
  const sideWidth = (width - squareSize) / 2;

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const urlParams = new URLSearchParams(data.replace('upi://pay?', ''));
    const receiverName = urlParams.get('pn');
    const receiverDetails = urlParams.get('pa');
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.push({ pathname: '/paymentPage', params: { receiverName,  receiverDetails} });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        enableTorch={true}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        {/* Top Blur */}
        <BlurView
          intensity={50}
          style={[styles.blur, { top: 0, height: 250, width }]}
        />
        {/* Bottom Blur */}
        <BlurView
          intensity={50}
          style={[styles.blur, { bottom: 0, height: 265, width }]}
        />
        {/* Left Blur */}
        <BlurView
          intensity={50}
          style={[
            styles.blur,
            { top: 250, height: 235, width: 100, right: 320 },
          ]}
        />
        {/* Right Blur */}
        <BlurView
          intensity={50}
          style={[
            styles.blur,
            { top: 250, height: 235, left: 320, width: sideWidth },
          ]}
        />
      </View>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7 )",
  },
});
