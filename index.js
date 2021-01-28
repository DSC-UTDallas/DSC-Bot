require("dotenv").config();
const { sendRulesReaction, addRole } = require("./commands/react-role");
const {
  sendCommands,
  addIdea,
  getIdeas,
  deleteIdea,
} = require("./commands/agenda");
const { addTodo, getTodo, deleteTodo } = require("./commands/todo");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  const message = msg.content.toLowerCase();
  const dsc = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");

  if (message.startsWith("!help")) {
    sendCommands(msg, dsc);
  }

  if (message.startsWith("!addidea")) {
    const idea = message.substr(message.indexOf(" ") + 1);
    addIdea(msg, idea);
  }

  if (message.startsWith("!addtodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    console.log(messageDetails);
    addTodo(msg, messageDetails);
  }

  if (message.startsWith("!ideas")) {
    getIdeas(msg, dsc);
  }

  if (message.startsWith("!todo")) {
    const team = message.substr(message.indexOf(" ") + 1);
    getTodo(msg, team, dsc);
  }

  if (message.startsWith("!removeidea")) {
    const idea = message.substr(message.indexOf(" ") + 1);
    deleteIdea(msg, idea);
  }

  if (message.startsWith("!removetodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    deleteTodo(msg, messageDetails);
  }

  if (message.startsWith("!rules")) {
    sendRulesReaction(msg);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addRole(reaction, user);
});

client.login(process.env.DISCORD_TOKEN);
