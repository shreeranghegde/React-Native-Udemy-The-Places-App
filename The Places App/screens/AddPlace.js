import { useState } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  const [isInserting, setIsInserting] = useState(false);
  async function createPlaceHandler(place) {
    if(place) {
      setIsInserting(true);
      await insertPlace(place);
      setIsInserting(false)
    }
    if(!isInserting) {
      navigation.navigate("AllPlaces");
    }
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
