import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  useCameraPermissions,
  PermissionStatus,
  getCameraPermissionsAsync,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [pickedImage, setPickedImage] = useState();

  //   async function verifyPermissions() {
  // if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
  //   const permissionsResponse = await requestPermission();
  //   return permissionsResponse.granted;
  // }
  // if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
  //   Alert.alert(
  //     "Insufficient Permissions",
  //     "You need to grant camera permissions to use this app."
  //   );
  //   return false;
  // }

  // return true;
  //   }

  //   async function verifyPermissions() {
  //     if (
  //       cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
  //       cameraPermissionInformation.status === PermissionStatus.DENIED
  //     ) {
  //       const permissionResponse = await requestPermission();

  //       return permissionResponse.granted;
  //     }

  //     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
  //       Alert.alert(
  //         "Insufficient Permissions!",
  //         "You need to grant camera permissions to use this app."
  //       );
  //       return false;
  //     }

  //     return true;
  //   }

  //   async function takeImageHandler() {
  //     return; //remove after issue fixed
  //     const permissions = await requestCameraPermissionsAsync();
  //     console.log("await requestCameraPermissionsAsync();");
  //     console.log(permissions);
  //     const hasPermission = await verifyPermissions();
  //     // console.log(hasPermission);
  //     if (hasPermission) {
  //       const image = await launchCameraAsync({
  //         allowsEditing: true,
  //         aspect: [16, 9],
  //         quality: 0.5,
  //       });
  //       console.log(image);

  // setPickedImage(image.uri);
  // onTakeImage(image.uri);

  //     } else {
  //       return;
  //     }
  //   }

  //   let imagePreview = <Text>No Image taken yet.</Text>;

  //   if (pickedImage) {
  //     imagePreview = <Image source={{ uri: pickedImage }} />;
  //   }

  let imagePreview = <Text>No Image taken yet.</Text>;
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera">Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
