import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { s } from "./Icons.style";
import { Word } from "../Word";

export const Icons = (props) => {
  return (
    <View style={s.root}>
      <View>
        <Word size={20} color="white">
          ${props.arr}
        </Word>
      </View>
      <TouchableOpacity style={s.button} onPress={props.onPressDialog}>
        <Word size={20} color="#82E0AA">
          Enter Zip Code
        </Word>
      </TouchableOpacity>
      <View>
        <TouchableOpacity>
          <EvilIcons
            name="trash"
            size={55}
            color="#EC7063"
            onPress={props.onPress}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
