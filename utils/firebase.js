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
        agenda.push(`${emoji} ` + doc.data().agendaIdea);
      });
    });
  return agenda;
};

exports.GETtodo = async (team, emoji) => {
  var agenda = [];
  await db
    .collection(team)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        agenda.push(`${emoji} ` + doc.data().todo);
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
      agendaIdea: index.toString() + " - " + idea,
    })
    .then(function (docRef) {
      console.log("Document written");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

exports.POSTtodo = async (messageDetails) => {
  const team = messageDetails.substr(0, messageDetails.indexOf(" "));
  const idea = messageDetails.substr(messageDetails.indexOf(" ") + 1);
  var index = Math.floor(Math.random() * 99);

  console.log(team);

  await db
    .collection(team)
    .doc(index.toString())
    .set({
      todo: index.toString() + " - " + idea,
    })
    .then(function (docRef) {
      console.log("Document written");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

exports.DELETEidea = async (index) => {
  await db
    .collection("DSC UTD")
    .doc(index.toString())
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

exports.DELETEtodo = async (messageDetails) => {
  const team = messageDetails.substr(0, messageDetails.indexOf(" "));
  const idea = messageDetails.substr(messageDetails.indexOf(" ") + 1);

  await db
    .collection(team)
    .doc(idea.toString())
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
