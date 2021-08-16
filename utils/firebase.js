const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

exports.GETagenda = async (emoji) => {
  var agenda = [];
  await db
    .collection("DSC UTD")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        agenda.push(`${emoji} ` + doc.id + " - " + doc.data().agendaIdea);
      });
    });
  return agenda;
};

exports.GETevents = async (emoji) => {
  var events = [];

  await db
    .collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
    });
  return events;
};

exports.addEvent = async (deadlines) => {
  await db
    .collection("events")
    .add(deadlines)
    .then(function (docRef) {
      //console.log("Document written");
    })
    .catch(function (error) {
      //console.error("Error adding document: ", error);
    });
};

exports.GETtodo = async (team, emoji) => {
  var agenda = [];
  await db
    .collection(team)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        agenda.push(`${emoji} ` + doc.id + " - " + doc.data().todo);
      });
    });
  return agenda;
};

exports.POSTidea = async (idea) => {
  var index = Math.floor(Math.random() * 99);

  await db
    .collection("DSC UTD")
    .doc(index.toString())
    .set({
      agendaIdea: idea,
    })
    .then(function (docRef) {
      //console.log("Document written");
    })
    .catch(function (error) {
      //console.error("Error adding document: ", error);
    });
};

exports.POSTtodo = async (team, idea) => {
  var index = Math.floor(Math.random() * 99);

  await db
    .collection(team)
    .doc(index.toString())
    .set({
      todo: idea,
    })
    .then(function (docRef) {
      //console.log("Document written");
    })
    .catch(function (error) {
      //console.error("Error adding document: ", error);
    });
};

exports.DELETEidea = async (index) => {
  await db
    .collection("DSC UTD")
    .doc(index.toString())
    .delete()
    .then(function () {
      //console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      //console.error("Error removing document: ", error);
    });
};

exports.DELETEtodo = async (team, idea) => {
  await db
    .collection(team)
    .doc(idea.toString())
    .delete()
    .then(function () {
      //console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      //console.error("Error removing document: ", error);
    });
};
