import React from "react";

const DialogContainer = (props) => {
  return (
    <Dialog.Container visible={props.isDialogVisible}>
      <Dialog.Title>{props.title}</Dialog.Title>
      <Dialog.Input
        autoCapitalize="none"
        placeholder="Name of item"
        onChangeText={props.placeholderOneFunc}
      />
      <Dialog.Input
        placeholder="Quantity"
        onChangeText={props.placeHolderTwoFunc}
      />
      <Dialog.Input
        inputMode="decimal"
        placeholder="Price"
        onChangeText={props.placeHolderThreeFunc}
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
