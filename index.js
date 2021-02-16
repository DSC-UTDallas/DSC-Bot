require("dotenv").config();
const { sendRulesReaction, addRole } = require("./commands/react-role");
const { addIdea, getIdeas, deleteIdea } = require("./commands/agenda");
const { addTodo, getTodo, deleteTodo } = require("./commands/todo");
const { sendMessage, sendDM } = require("./commands/message");
const { setStream, stopStream } = require("./commands/stream");
const { sendCommands } = require("./commands/help");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!help", { type: "LISTENING" });
});

client.on("message", async (msg) => {
  const message = msg.content.toLowerCase();

  if (message.startsWith("!help")) {
    sendCommands(msg);
  }

  if (message.startsWith("!addidea")) {
    if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
      addIdea(msg);
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
    if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
      getIdeas(msg);
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
      deleteIdea(msg);
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

  if (message.startsWith("!message")) {
    const messageDetails = msg.content.substr(message.indexOf(" ") + 1);
    const channelID = messageDetails.substr(0, messageDetails.indexOf(" "));
    const messageContent = messageDetails.substr(
      messageDetails.indexOf(" ") + 1
    );
    sendMessage(msg, client, channelID, messageContent);
  }

  if (message.startsWith("!dm")) {
    const messageDetails = msg.content.substr(message.indexOf(" ") + 1);
    const userID = messageDetails.substr(0, messageDetails.indexOf(" "));
    const messageContent = messageDetails.substr(
      messageDetails.indexOf(" ") + 1
    );
    sendDM(msg, client, userID, messageContent);
  }

  if (message.startsWith("!stream")) {
    setStream(client, msg);
  }

  if (message.startsWith("!stopstream")) {
    stopStream(client, msg);
  }

  //HIDDEN COMMANDS
  if (message.startsWith("!pizza")) {
    msg.react("🍕");
  }

  if (message.startsWith("!barsha")) {
    msg.react("🅱️");
    content = message.substr(message.indexOf(" ") + 1);
    content = content.split(" ");
    content.forEach(function (part, index, content) {
      content[index] = "🅱️" + content[index].substring(1);
    });
    msg.channel.send(content.slice(0, content.length).join(" "));
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addRole(reaction, user);
});

client.login(process.env.DISCORD_TOKEN);
