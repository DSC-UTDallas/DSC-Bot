require("dotenv").config();
const { loggerInfo, loggerError } = require("./utils/logging.js");
const { checkPermissions } = require("./utils/permissions");
const { addIdea, getIdeas, deleteIdea } = require("./commands/agenda");
const { addTodo, getTodo, deleteTodo } = require("./commands/todo");
const { sendMessage, sendDM } = require("./commands/message");
const { setStream, stopStream } = require("./commands/stream");
const { sendCommands } = require("./commands/help");
const { sendQOTD } = require("./commands/qotd");
const { createTeams } = require("./commands/teams");
const { sendInfo, sendOfficers, deleteMessages } = require("./commands/info");
const {
  getEventDeadlines,
  addEventDeadlines,
} = require("./commands/event-deadlines");
const Discord = require("discord.js");
var cron = require("node-cron");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!help", { type: "LISTENING" });
});

cron.schedule(
  "45 18 * * *",
  () => {
    getEventDeadlines();
  },
  {
    scheduled: true,
    timezone: "America/Chicago",
  }
);

client.on("message", async (msg) => {
  const message = msg.content.toLowerCase();

  if (message.startsWith("!help")) sendCommands(msg);

  if (message.startsWith("!addtodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    const team = messageDetails.split(" ")[0];
    if (checkPermissions(msg, team)) addTodo(msg, messageDetails);
  }

  if (message.startsWith("!todo")) {
    const team = message.substr(message.indexOf(" ") + 1);
    if (checkPermissions(msg, team)) getTodo(msg, team);
  }

  if (message.startsWith("!removetodo")) {
    const messageDetails = message.substr(message.indexOf(" ") + 1);
    const team = messageDetails.split(" ")[0];
    if (checkPermissions(msg, team)) deleteTodo(msg, messageDetails);
  }

  if (message.startsWith("!message")) {
    if (checkPermissions(msg, "Officers")) sendMessage(msg, client);
  }

  if (message.startsWith("!setstream")) {
    if (checkPermissions(msg, "Officers")) setStream(client, msg);
  }

  if (message.startsWith("!stopstream")) {
    if (checkPermissions(msg, "Officers")) stopStream(client, msg);
  }

  if (message.startsWith("!qotd")) {
    if (checkPermissions(msg, "Officers")) sendQOTD(client, msg);
  }

  if (message.startsWith("!clubinfo")) {
    if (checkPermissions(msg, "Developers")) sendInfo(client, msg);
  }

  if (message.startsWith("!officers")) {
    if (checkPermissions(msg, "Developers")) sendOfficers(client, msg);
  }

  if (message.startsWith("!deleteofficers")) {
    if (checkPermissions(msg, "Developers")) deleteMessages(client, msg);
  }

  if (message.startsWith("!events")) {
    if (checkPermissions(msg, "Developers")) getEventDeadlines();
  }

  if (message.startsWith("!event")) {
    if (checkPermissions(msg, "Officers")) addEventDeadlines(client, msg);
  }

  if (message.startsWith("!team")) {
    if (checkPermissions(msg, "Officers")) createTeams(client, msg);
  }

  //HIDDEN COMMANDS
  if (message.startsWith("!pizza")) {
    const author = msg.author.username + "#" + msg.author.discriminator;
    try {
      msg.react("🍕");
      loggerInfo(author + " requested pizza");
    } catch (e) {
      loggerError(author + " could not request pizza ;-;", e);
    }
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

client.login(process.env.DISCORD_TOKEN);
