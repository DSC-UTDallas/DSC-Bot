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

exports.GETagenda = async (dsc) => {
  var agenda = [];
  await db
    .collection("DSC UTD")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        agenda.push(`${dsc} ` + doc.data().agendaIdea);
      });
    });
  return agenda;
};

exports.POSTidea = async (idea) => {
  await db
    .collection("DSC UTD")
    .doc(idea)
    .set({
      agendaIdea: idea,
    })
    .then(function (docRef) {
      console.log("Document written");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

exports.DELETEidea = async (idea) => {
  await db
    .collection("DSC UTD")
    .doc(idea)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
