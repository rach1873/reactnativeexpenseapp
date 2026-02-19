import { StatusBar } from "expo-status-bar";
import "./global.css";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { s } from "./App.style";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Icons } from "./components/Icons/Icons";
import { AddIcon } from "./components/AddIcon";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import { data } from "./components/FakeData";
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ModalComponent } from "./components/Modal";
import ModalContainer from "./components/ModalContainer";
import ModalZipContainer from "./components/ModalZipContainer";
import DialogContainer from "./components/DialogContainer";
import DialogZipContainer from "./components/DialogZipContainer";
import FoodWeb from "./components/Food/FoodWeb";
import FoodMobile from "./components/Food/FoodMobile";
import Swal from "sweetalert2";

let isFirstRender = true;

export default function App() {
  const [salesTax, setSalesTax] = useState(0);
  const [modal, setModal] = useState(false);
  const [noteArray, setNoteArray] = useState([]); //?comes from local storage
  const [zip, setZip] = useState("");
  const [zipDialog, setZipDialog] = useState(false);
  const [isDialogVisible, setDialog] = useState(false);
  const [note, setNote] = useState({
    id: "",
    title: "",
    price: 0.0,
    qty: 0,
  });
  const [isEditVisible, setEditVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      saveNotes();
    } else {
      isFirstRender = false;
    }
  }, [noteArray, salesTax]);

  const loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem("@notes");
      const parsedNotes = JSON.parse(notes);
      const tax = await AsyncStorage.getItem("@salestax");
      const parsedTax = JSON.parse(tax);

      setNoteArray(parsedNotes || []);
      setSalesTax(parsedTax || 0);
    } catch (err) {
      alert(err);
    }
  };
  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem("@notes", JSON.stringify(noteArray));
      await AsyncStorage.setItem("@salestax", JSON.stringify(salesTax));
    } catch (err) {
      alert(err);
    }
  };

  const options = {
    method: "GET",
    url: `https://retrieveustaxrate.p.rapidapi.com/GetTaxRateByZip?zip=${zip}`,
    headers: {
      "x-rapidapi-key": "fc253d3d50msh904d92d7fca9a2cp10a84cjsnf485d1c60b91",
      "x-rapidapi-host": "retrieveustaxrate.p.rapidapi.com",
      Authorization: "Basic Ym9sZGNoYXQ6TGZYfm0zY2d1QzkuKz9SLw==",
    },
  };

  async function getZipAPI() {
    try {
      const response = await axios.request(options);
      setSalesTax(parseFloat(response.data.TaxRate) + 1);
    } catch (error) {
      alert("Zip Code Does Not Exist!!!!");
    }
  }

  const checkZip = () => {
    if (zip.length === 5) {
      getZipAPI();
      setZipDialog(!zipDialog);
    } else {
      Alert.alert("Warning", "Please Check Zip Code", [
        {
          text: "Okay",
        },
      ]);
    }
  };

  {
    /*//! Toggles dialog input box*/
  }
  const toggle = () => {
    if (!salesTax) {
      setModal(true);
    } else {
      setDialog(!isDialogVisible);
    }
  };

  const addNote = () => {
    if (!note.title) {
      // console.log('working');
    } else {
      setNoteArray([...noteArray, { ...note, id: uuid.v4() }]);
      toggle();
      setNote({
        id: "",
        title: "",
        price: 0.0,
        qty: 0,
      });
    }
  };

  const removeAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("@notes");
      await AsyncStorage.removeItem("@salestax");
      setNoteArray(noteArray.filter((x) => x.id === 0));
      setSalesTax(0);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteModal(false);
    }
  };

  const deleteAllNotes = () => {
    if (Platform.OS !== "web") {
      Alert.alert("Warning", "This action will remove all notes!!", [
        {
          text: "Remove All",
          style: "destructive",
          onPress: () => removeAsyncStorage(),
        },
        {
          text: "Cancel",
        },
      ]);
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "All Notes Will Be Deleted!",
        icon: "warning",
        background: "#34495E",
        color: "white",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#F9E79F",
        confirmButtonText: "Delete All Notes",
        backdrop: false,
      }).then((result) => {
        if (result.isConfirmed) {
          removeAsyncStorage();
        }
      });
    }
  };

  const getTotal = () => {
    const total =
      noteArray.reduce((acc, cv) => {
        return cv.qty ? acc + cv.price * cv.qty : acc + cv.price;
      }, 0) * salesTax;

    return total.toFixed(2);
  };

  const deleteNote = (note) => {
    const updatedNotes = noteArray.filter((x) => x.id !== note.id);

    if (Platform.OS !== "web") {
      Alert.alert("Delete Note", "Are your sure your want to delete?", [
        {
          text: "Remove Note",
          style: "destructive",
          onPress: () => setNoteArray(updatedNotes),
        },
        { text: "Cancel" },
      ]);
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Note Will Be Deleted!",
        icon: "warning",
        background: "#34495E",
        color: "white",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#F9E79F",
        confirmButtonText: "Delete Note",
        backdrop: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setNoteArray(updatedNotes);
        }
      });
    }
  };

  const handleEditBox = (n) => {
    setEditVisible(!isEditVisible);
    setCurrentEdit({
      id: n.id,
      title: n.title,
      price: n.price,
      qty: n.qty,
    });
  };

  const showEditBox = (n) => {
    setEditVisible(!isEditVisible);
    setNote(n);
  };

  const updateNote = () => {
    const newNotes = noteArray.map((n) => (n.id === note.id ? note : n));

    setNoteArray(newNotes);

    setEditVisible(!isEditVisible);

    setNote({
      id: "",
      title: "",
      price: 0.0,
      qty: 0,
    });
  };

  const renderDialog = () => {
    if (Platform.OS !== "web") {
      return (
        <>
          <DialogContainer
            isDialogVisible={isDialogVisible}
            title="Add Note"
            item={(txt) => setNote({ ...note, title: txt })}
            qty={(qty) => setNote({ ...note, qty: qty })}
            price={(amount) => setNote({ ...note, price: +amount })}
            buttonOneLabel="Add"
            buttonFuncOne={() => addNote()}
            buttonFuncTwo={() => toggle()}
          />
          <DialogContainer
            isDialogVisible={isEditVisible}
            title="Change Note"
            item={(txt) => setNote({ ...note, title: txt })}
            qty={(qty) => setNote({ ...note, qty: qty })}
            price={(amount) => setNote({ ...note, price: +amount })}
            buttonOneLabel="Change"
            buttonFuncOne={() => updateNote()}
            buttonFuncTwo={() => setEditVisible(!isEditVisible)}
          />
          <DialogZipContainer
            zipDialog={zipDialog}
            zipFunc={(zipCode) => setZip(zipCode)}
            zipCancel={() => setZipDialog(!zipDialog)}
            zipEnter={checkZip}
          />
        </>
      );
    } else {
      return (
        <>
          <ModalContainer
            isDialogVisible={isDialogVisible}
            title="Add Note"
            item={(txt) => setNote({ ...note, title: txt })}
            qty={(qty) => setNote({ ...note, qty: qty })}
            price={(price) => setNote({ ...note, price: +price })}
            buttonTitleOne="Add"
            buttonFuncOne={() => addNote()}
            buttonTitleTwo="Cancel"
            buttonFuncTwo={() => toggle()}
          />
          <ModalContainer
            isDialogVisible={isEditVisible}
            title="Change Note"
            item={(title) => setNote({ ...note, title: title })}
            qty={(qty) => setNote({ ...note, qty: qty })}
            price={(price) => setNote({ ...note, price: +price })}
            buttonTitleOne="Change"
            buttonFuncOne={() => updateNote()}
            buttonTitleTwo="Cancel"
            buttonFuncTwo={() => setEditVisible(!isEditVisible)}
          />
          <ModalZipContainer
            zipDialog={zipDialog}
            zipInput={(zipCode) => setZip(zipCode)}
            zipFuncCancel={() => setZipDialog(!zipDialog)}
            zipGetZipCode={checkZip}
          />
        </>
      );
    }
  };

  const renderFood = () => {
    if (Platform.OS !== "web") {
      return noteArray.map((note) => (
        <FoodMobile
          key={note.id}
          food={note.title}
          price={note.price}
          qty={note.qty}
          onLongPress={() => deleteNote(note)}
          onPress={() => showEditBox(note)}
        />
      ));
    } else {
      return noteArray.map((note) => {
        return (
          <FoodWeb
            key={note.id}
            food={note.title}
            price={note.price}
            qty={note.qty}
            delete={() => deleteNote(note)}
            edit={() => showEditBox(note)}
          />
        );
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.root}>
        <Icons
          arr={getTotal()}
          onPress={() => deleteAllNotes()}
          onPressDialog={() => setZipDialog(!zipDialog)}
        />
        <ScrollView>{renderFood()}</ScrollView>
        {renderDialog()}
        {/*//! add button to create notes*/}
        <AddIcon onPress={() => toggle()} />
        {/*//! modal*/}
        <ModalComponent show={modal} btn={() => setModal(!modal)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
