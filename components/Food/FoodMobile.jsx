import { TouchableOpacity, View } from "react-native";
import { s } from "./Food.style";
import { Word } from "../Word";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const FoodMobile = (props) => {
  return (
    <TouchableOpacity
      style={s.root}
      onLongPress={props.onLongPress}
      onPress={props.onPress}
    >
      <Word size={20}>
        {props.qty ? `${props.food} (${props.qty})` : props.food}
      </Word>
      <View className="flex-row items-center gap-x-2">
        <Word size={20}>${props.price}</Word>
      </View>
    </TouchableOpacity>
  );
};

export default FoodMobile;
