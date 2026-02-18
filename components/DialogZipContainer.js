import Dialog from "react-native-dialog";

const DialogZipContainer = (props) => {
  return (
    <Dialog.Container visible={props.zipDialog}>
      <Dialog.Title>Enter Zip Code</Dialog.Title>
      <Dialog.Input
        placeholder="Zip Code ex:90210"
        keyboardType="numeric"
        maxLength={5}
        onChangeText={props.zipFunc}
      />
      <Dialog.Button label="Cancel" onPress={props.zipCancel} />
      <Dialog.Button label="Enter" onPress={props.zipEnter} />
    </Dialog.Container>
  );
};

export default DialogZipContainer;
