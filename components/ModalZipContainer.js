import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

const ModalZipContainer = (props) => {
  return (
    <Modal visible={props.zipDialog} transparent={true} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black opacity-70">
        <View className="w-96 bg-white rounded-md">
          <Text className="text-center text-2xl underline">Enter Zip Code</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={5}
            className="border-b p-2 outline-none border-black"
            placeholder="Zip Code"
            onChangeText={props.zipInput}
          />
        </View>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity
            className="bg-emerald-500 rounded-md p-2"
            onPress={props.zipFuncCancel}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-violet-500 rounded-md p-2"
            onPress={props.zipGetZipCode}
          >
            <Text>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalZipContainer;
