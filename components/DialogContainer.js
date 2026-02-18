import Dialog from "react-native-dialog";

const DialogContainer = (props) => {
  return (
    <Dialog.Container visible={props.isDialogVisible}>
      <Dialog.Title>{props.title}</Dialog.Title>
      <Dialog.Input
        autoCapitalize="none"
        placeholder="Name of item"
        r
        onChangeText={props.item}
      />
      <Dialog.Input placeholder="Quantity" onChangeText={props.qty} />
      <Dialog.Input
        inputMode="decimal"
        placeholder="Price"
        onChangeText={props.price}
      />
      <Dialog.Button
        label={props.buttonOneLabel}
        onPress={props.buttonFuncOne}
      />
      <Dialog.Button label="Cancel" onPress={props.buttonFuncTwo} />
    </Dialog.Container>
  );
};

export default DialogContainer;
