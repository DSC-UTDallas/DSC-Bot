require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const firebaseConfig = {
  apiKey: "AIzaSyCdfSekpWGEDTwZ41xbcSZoqZtXRW3zms4",
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

client.on("message", (msg) => {
  const message = msg.content.toLowerCase();

  if (message.startsWith("!help")) {
    commands = [
      "!help: To get the list of commands",
      "!ideas: To see the list of ideas for next meeting agenda",
      "!addIdea <idea>: To add an idea for next meeting agenda",
      "!removeIdea <idea>: To remove the idea from next meeting agenda",
    ];
    msg.channel.send(
      "These are the commands you can use (not case-sensitive):"
    );
    const embed = new Discord.MessageEmbed()
      .setTitle("Command List")
      .setColor(0x2b85d3)
      .setDescription(commands);
    msg.channel.send(embed);
  }

  if (message.startsWith("!addidea")) {
    const idea = message.substr(message.indexOf(" ") + 1);
    msg.channel.send(idea + " added to list");
    db.collection("DSC UTD")
      .add({
        agendaIdea: idea,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
