import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Word } from "./Word";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const s = StyleSheet.create({
  button: {
    backgroundColor: "#82E0AA",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
  },
});

export const ModalComponent = (props) => {
  return (
    <Modal visible={props.show} animationType="slide">
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            backgroundColor: "#ddd",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Word size={20}>Please set zip code before use!!</Word>
          <TouchableOpacity style={s.button} onPress={props.btn}>
            <Word size={20}>Got It</Word>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
