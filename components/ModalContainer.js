import React from 'react';

const ModalContainer = (props) => {
    return (
        <Modal visible={props.isDialogVisible} transparent={true} animationType="fade">
            <View className='flex-1 items-center justify-center bg-black opacity-70'>
                <View className='w-96 bg-white rounded-md'>
                    <Text className='text-center text-2xl underline'>{props.title}</Text>
                    <TextInput className='border-b p-2 outline-none border-black' placeholder={props.placeholderOne} onChangeText={props.placeholderFunc} />
                    <TextInput className='border-b p-2 outline-none border-black' placeholder={props.placeHolderTwo} keyboardType="numeric" onChangeText={props.placeHolderTwoFunc} />
                    <TextInput className='border-b p-2 outline-none border-black' placeholder={props.placeHolderThree} keyboardType="decimal-pad" onChangeText={props.placeHolderThreeFunc} />
                </View>
                <View className='flex-row gap-2 mt-2'>
                    <TouchableOpacity className='bg-emerald-500 rounded-md p-2' onPress={props.buttonsOnPressOne}>
                        <Text>{props.buttonTitleOne}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-violet-500 rounded-md p-2' onPress={props.buttonOnPressTwo}>
                        <Text>{props.buttonTitleTwo}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalContainer;