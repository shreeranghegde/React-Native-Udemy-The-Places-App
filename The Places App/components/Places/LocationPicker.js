import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  PermissionStatus,
} from "expo-location";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = useCallback(
    isFocused &&
      route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      },
    [route.params, isFocused]
  );

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({...pickedLocation, address: address});
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionsResponse = await requestPermission();
      return permissionsResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const permissions = await requestForegroundPermissionsAsync();
    console.log(permissions);
    const hasPermissions = await verifyPermissions();
    if (hasPermissions) {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      return;
    }
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map (Find me)
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
