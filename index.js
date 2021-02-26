require("dotenv").config();
const { checkPermissions } = require("./utils/permissions");
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
    if (checkPermissions(msg, "Officers")) getIdeas(msg);
  }

  if (message.startsWith("!todo")) {
    const team = message.substr(message.indexOf(" ") + 1);

    if (msg.member.roles.cache.some((r) => r.name.toLowerCase() === team)) {
      getTodo(msg, team);
    } else {
      msg.reply("Access denied to command");
    }
  }

  if (message.startsWith("!removeidea")) {
    if (checkPermissions(msg, "Officers")) deleteIdea(msg);
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
    if (checkPermissions(msg, "Officers")) sendRulesReaction(msg);
  }

  if (message.startsWith("!message")) {
    if (checkPermissions(msg, "Officers")) sendMessage(msg, client);
  }

  if (message.startsWith("!dm")) {
    if (checkPermissions(msg, "Officers")) sendDM(msg, client);
  }

  if (message.startsWith("!stream")) {
    if (checkPermissions(msg, "Officers")) setStream(client, msg);
  }

  if (message.startsWith("!stopstream")) {
    if (checkPermissions(msg, "Officers")) stopStream(client, msg);
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
    msg.delete({ timeout: 1000 });
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  addRole(reaction, user);
});

client.login(process.env.DISCORD_TOKEN);
