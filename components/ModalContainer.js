import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

const ModalContainer = (props) => {
  return (
    <Modal
      visible={props.isDialogVisible}
      transparent={true}
      animationType="fade"
    >
      <View className="flex-1 items-center justify-center bg-black opacity-70">
        <View className="w-96 bg-white rounded-md">
          <Text className="text-center text-2xl underline">{props.title}</Text>
          <TextInput
            className="border-b p-2 outline-none border-black"
            placeholder="Food Item"
            onChangeText={props.item}
          />
          <TextInput
            className="border-b p-2 outline-none border-black"
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={props.qty}
          />
          <TextInput
            className="border-b p-2 outline-none border-black"
            placeholder="Price"
            keyboardType="decimal-pad"
            onChangeText={props.price}
          />
        </View>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity
            className="bg-emerald-500 rounded-md p-2"
            onPress={props.buttonFuncOne}
          >
            <Text>{props.buttonTitleOne}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-violet-500 rounded-md p-2"
            onPress={props.buttonFuncTwo}
          >
            <Text>{props.buttonTitleTwo}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
