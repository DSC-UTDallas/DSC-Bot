require("dotenv").config();
const { sendRulesReaction, addRole } = require("./commands/react-role");

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

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

client.on("message", async (msg) => {
  const message = msg.content.toLowerCase();
  const dsc = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");

  if (message.startsWith("!help")) {
    commands = [
      `${dsc} !help: To get the list of commands`,
      `${dsc} !ideas: To see the list of ideas for next meeting agenda`,
      `${dsc} !addIdea <idea>: To add an idea for next meeting agenda`,
      `${dsc} !removeIdea <idea>: To remove the idea from next meeting agenda`,
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
    await addIdea(idea);
    msg.delete({ timeout: 1000 });
  }

  if (message.startsWith("!ideas")) {
    agenda = await getAgenda(dsc);

    //msg.channel.send("These are the agenda items for next meeting: ");
    const embed = new Discord.MessageEmbed()
      .setTitle("Agenda Ideas for Next Meeting")
      .setColor(0x2b85d3)
      .setDescription(agenda);
    msg.channel.send(embed);
  }

  if (message.startsWith("!removeidea")) {
    const idea = message.substr(message.indexOf(" ") + 1);
    await deleteIdea(idea);
    msg.delete({ timeout: 1000 });
  }

  if (message.startsWith("!rules")) {
    sendRulesReaction(msg);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addRole();
});

async function getAgenda(dsc) {
  var agenda = [];
  await db
    .collection("DSC UTD")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().agendaIdea);
        agenda.push(`${dsc} ` + doc.data().agendaIdea);
      });
    });
  return agenda;
}

async function addIdea(idea) {
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
}

async function deleteIdea(idea) {
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
}

client.login(process.env.DISCORD_TOKEN);
