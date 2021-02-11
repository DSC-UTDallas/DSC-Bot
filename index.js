require("dotenv").config();
const { sendRulesReaction, addRole } = require("./commands/react-role");
const {
  sendCommands,
  addIdea,
  getIdeas,
  deleteIdea,
} = require("./commands/agenda");
const { addTodo, getTodo, deleteTodo } = require("./commands/todo");
const { sendMessage, sendDM } = require("./commands/message");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  const message = msg.content.toLowerCase();

  if (message.startsWith("!help")) {
    const dsc = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
    sendCommands(msg, dsc);
  }

  if (message.startsWith("!addidea")) {
    if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
      const idea = message.substr(message.indexOf(" ") + 1);
      addIdea(msg, idea);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!addtodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    const team = messageDetails.split(" ")[0];
    if (msg.member.roles.cache.some((r) => r.name.toLowerCase() === team)) {
      addTodo(msg, messageDetails);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!ideas")) {
    const dsc = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
    if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
      getIdeas(msg, dsc);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!todo")) {
    const dsc = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
    const team = message.substr(message.indexOf(" ") + 1);
    if (msg.member.roles.cache.some((r) => r.name.toLowerCase() === team)) {
      getTodo(msg, team, dsc);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!removeidea")) {
    if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
      const idea = message.substr(message.indexOf(" ") + 1);
      deleteIdea(msg, idea);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!removetodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    const team = messageDetails.split(" ")[0];
    if (msg.member.roles.cache.some((r) => r.name.toLowerCase() === team)) {
      deleteTodo(msg, messageDetails);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!rules")) {
    sendRulesReaction(msg);
  }

  // message <channel> <msg>
  if (message.startsWith("!message")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    console.log(messageDetails);
    const channelID = messageDetails.substr(0, messageDetails.indexOf(" "));
    const messageContent = messageDetails.substr(
      messageDetails.indexOf(" ") + 1
    );
    sendMessage(msg, client, channelID, messageContent);
  }

  if (message.startsWith("!dm")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    console.log(messageDetails);
    const userID = messageDetails.substr(0, messageDetails.indexOf(" "));
    const messageContent = messageDetails.substr(
      messageDetails.indexOf(" ") + 1
    );
    sendDM(msg, client, userID, messageContent);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addRole(reaction, user);
});

client.login(process.env.DISCORD_TOKEN);
