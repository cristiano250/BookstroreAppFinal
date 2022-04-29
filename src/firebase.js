import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
import 'firebase/compat/database';
import 'firebase/compat/messaging';



require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");

var firebaseConfig = {
  apiKey: "AIzaSyAcq58QjKajrRbuhOejgRwTabySUchaqkU",
  authDomain: "readme-d0716.firebaseapp.com",
  projectId: "readme-d0716",
  storageBucket: "readme-d0716.appspot.com",
  messagingSenderId: "561834886854",
  appId: "1:561834886854:web:067e01e56da82d81df39c7",
  measurementId: "G-D58LVXZKE1"
};

//Init firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const functions = firebase.functions();
const realtimeDb = firebase.database();

export {
	firebase,
	auth,
	db,
	storage,
  functions,
  realtimeDb
}