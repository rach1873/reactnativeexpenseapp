import { TouchableOpacity, View } from "react-native";
import { s } from "./Food.style";
import { Word } from "../Word";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FoodWeb = (props) => {
  return (
    <TouchableOpacity style={s.root}>
      <Word size={20}>
        {props.qty ? `${props.food} (${props.qty})` : props.food}
      </Word>
      <View className="flex-row items-center gap-x-2">
        <Word size={20}>${props.price}</Word>
        <Ionicons
          name="remove-circle"
          size={35}
          color="red"
          className="cursor-pointer"
          onPress={props.delete}
        />
        <FontAwesome
          name="edit"
          size={35}
          color="green"
          className="cursor-pointer"
          onPress={props.edit}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FoodWeb;
