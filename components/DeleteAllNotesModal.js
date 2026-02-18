import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const DeleteAllNotesModal = (props) => {
  return (
    <View
      className={`fixed inset-0 bg-black opacity-80 justify-center items-center ${props.show ? "visible" : "hidden"}`}
    >
      <View className="w-72 h-48 border border-white items-center justify-around rounded-md bg-zinc-500">
        <Text className="text-white text-2xl">
          All Notes Will be Deleted!!!
        </Text>
        <AntDesign name="warning" size={45} color="#FF0000" />
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="bg-[#FF0000] p-2 rounded-md cursor-pointer active:scale-75 duration-200"
            onPress={props.delete}
          >
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-emerald-500 p-2 rounded-md cursor-pointer active:scale-75 duration-200"
            onPress={props.cancel}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteAllNotesModal;
