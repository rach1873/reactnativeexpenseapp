import { TouchableOpacity, Text, View } from "react-native";
import { s } from "./Food.style";
import { Word } from "../Word";

export const Food = (props) => {
  return (
    <TouchableOpacity
      style={s.root}
      onLongPress={props.onLongPress}
      onPress={props.onPress}
    >
      <Word size={20}>
        {props.qty ? `${props.food} (${props.qty})` : props.food}
      </Word>
      <Word size={20}>${props.price}</Word>
    </TouchableOpacity>
  );
};
