import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const AddIcon = (props) => {
  return (
    <TouchableOpacity style={s.root} onPress={props.onPress}>
      <AntDesign name="pluscircle" size={45} color="#2ECC71" />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  root: {
    position: "absolute",
    margin: "auto",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#34495E",
    padding: 20,
    borderRadius: "50%",
  },
});
