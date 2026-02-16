import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';
import { s } from './App.style';
import { Icons } from './components/Icons/Icons';
import { Food } from './components/Food/Food';
import { AddIcon } from './components/AddIcon';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { data } from './components/FakeData';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { ModalComponent } from './components/Modal';



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
    price: 0.00,
    qty: 0
  });
  const [isEditVisible, setEditVisible] = useState(false);

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
    url: `https://us-sales-tax-rates.p.rapidapi.com/tax/${zip}`,
    headers: {
      "X-RapidAPI-Key": "fc253d3d50msh904d92d7fca9a2cp10a84cjsnf485d1c60b91",
      "X-RapidAPI-Host": "us-sales-tax-rates.p.rapidapi.com",
    },
  };


  const getZipAPI = async () => {
    try {
      const res = await axios.request(options);
      setSalesTax(parseFloat(res.data.data.state_rate) + 1);


    } catch (err) {
      alert("Zip Code Does Not Exist!!!");
    }
  };

  const checkZip = () => {
    if (zip.length === 5) {
      getZipAPI();
      setZipDialog(!zipDialog);

    } else {
      Alert.alert(
        "Warning",
        "Please Check Zip Code",
        [
          {
            text: "Okay"
          }
        ]
      );
    }
  };


  {/*//! Toggles dialog input box*/ }
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
        price: 0.00,
        qty: 0
      });
    }
  };


  const deleteAllNotes = () => {

    const removeAsyncStorage = async () => {
      try {
        await AsyncStorage.removeItem("@notes");
        await AsyncStorage.removeItem("@salestax");
        setNoteArray(noteArray.filter(x => x.id === 0));
        setSalesTax(0);
      } catch (err) {
        console.log(err);
      }
    };


    Alert.alert(
      "Warning",
      "This action will remove all notes!!",
      [
        {
          text: "Remove All", style: "destructive", onPress: () => removeAsyncStorage()
        },
        {
          text: "Cancel"
        }
      ]
    );
  };


  const getTotal = () => {

    const total = noteArray.reduce((acc, cv) => {
      return cv.qty ? acc + (cv.price * cv.qty) : acc + cv.price;
    }, 0) * salesTax;

    return total.toFixed(2);

  };

  const deleteNote = (note) => {
    Alert.alert(
      "Delete Note",
      "Are your sure your want to delete?",
      [
        { text: "Remove Note", style: "destructive", onPress: () => setNoteArray(noteArray.filter(x => x.id !== note.id)) },
        { text: "Cancel" }
      ]
    );
  };

  const handleEditBox = (n) => {
    setEditVisible(!isEditVisible);
    setCurrentEdit({
      id: n.id,
      title: n.title,
      price: n.price,
      qty: n.qty
    });
  };

  const showEditBox = (n) => {
    setEditVisible(!isEditVisible);
    setNote(n);
  };

  const updateNote = () => {

    const newNotes = noteArray.map(n => n.id === note.id ? note : n);

    setNoteArray(newNotes);

    setEditVisible(!isEditVisible);

    setNote({
      id: "",
      title: "",
      price: 0.00,
      qty: 0
    });
  };


  return (

    <SafeAreaView style={s.root}>
      <Icons arr={getTotal()} onPress={() => deleteAllNotes()} onPressDialog={() => setZipDialog(!zipDialog)} />
      <ScrollView>
        {noteArray.map(note =>
          <Food
            key={note.id}
            food={note.title}
            price={note.price}
            qty={note.qty}
            onLongPress={() => deleteNote(note)}
            onPress={() => showEditBox(note)}
          />)}
      </ScrollView>
      {/*//! Add a note container*/}
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Add Note</Dialog.Title>
        <Dialog.Input autoCapitalize="none" placeholder='Name of Item...' onChangeText={(txt) => setNote({ ...note, title: txt })} />
        <Dialog.Input placeholder='Quantity' onChangeText={(qty) => setNote({ ...note, qty: qty })} />
        <Dialog.Input inputMode='decimal' placeholder='Price' onChangeText={(amount) => setNote({ ...note, price: +amount })} />
        <Dialog.Button label="Add" onPress={() => addNote()} />
        <Dialog.Button label="Cancel" onPress={() => toggle()} />
      </Dialog.Container>
      {/*//! Edit Dialog Box*/}
      <Dialog.Container visible={isEditVisible}>
        <Dialog.Title>Change Note</Dialog.Title>
        <Dialog.Input autoCapitalize="none" placeholder='Name...' onChangeText={(txt) => setNote({ ...note, title: txt })} />
        <Dialog.Input placeholder='Quantity' onChangeText={(qty) => setNote({ ...note, qty: qty })} />
        <Dialog.Input inputMode='decimal' placeholder='Price' onChangeText={(amount) => setNote({ ...note, price: +amount })} />
        <Dialog.Button label="Update" onPress={() => updateNote()} />
        <Dialog.Button label="Cancel" onPress={() => setEditVisible(!isEditVisible)} />
      </Dialog.Container>
      {/*//! zipcode box*/}
      <Dialog.Container visible={zipDialog}>
        <Dialog.Title>Enter Zip Code</Dialog.Title>
        <Dialog.Input
          placeholder='Zip Code ex:90210'
          keyboardType='numeric'
          maxLength={5}
          onChangeText={(zipCode) => setZip(zipCode)}
        />
        <Dialog.Button label="Cancel" onPress={() => setZipDialog(!zipDialog)} />
        <Dialog.Button label="Enter" onPress={checkZip}
        />
      </Dialog.Container>
      {/*//! add button to create notes*/}
      <AddIcon onPress={() => toggle()} />
      {/*//! modal*/}
      <ModalComponent show={modal} btn={() => setModal(!modal)} />
    </SafeAreaView>

  );


}





