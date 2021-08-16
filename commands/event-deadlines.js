const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const { GETevents, addEvent } = require("../utils/firebase");

//exports.getEventDeadlines = async (client, msg) => {
exports.getEventDeadlines = async () => {
  // const webhook = new Discord.WebhookClient(id, token);
  const webhook = new Discord.WebhookClient(
    "874830853103026187",
    "Fwnx-MkNWZd-IY-CBZXDQ9G-jMDfeO20QHdWir40vgqAIwYXtSenvPWNTu1YbXxbqb2F"
  );

  const events = await GETevents();
  var relevantEvents = [];

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate());

  events.forEach((event) => {
    var eventDate = event.date.toDate();

    var minThresholdDate = new Date();
    minThresholdDate.setDate(eventDate.getDate() - 31);

    var maxThresholdDate = new Date();
    maxThresholdDate.setDate(eventDate.getDate() + 7);

    // console.log("event", event.name);
    // console.log("date", event.date.toDate());
    // console.log("start", minThresholdDate, "end", maxThresholdDate);

    if (minThresholdDate <= today && maxThresholdDate >= today) {
      // console.log(event.name);
      // console.log(event.date.toDate());
      relevantEvents.push(event);
    }
  });

  // console.log(relevantEvents);

  relevantEvents.forEach((event) => {
    // console.log(event.deadlines);
    var deadlines = event.deadlines;
    var eventName = event.name;

    deadlines.forEach((deadline) => {
      var deadlineDate = new Date(deadline.due.toDate());
      deadlineDate.setHours(0, 0, 0, 0);
      if (today.getDate() == deadlineDate.getDate()) {
        // console.log("event name", eventName);
        // console.log(deadline);
        var roleMention = "<@&" + deadline.officer.toString() + ">";
        // msg.channel.send(
        //   `${roleMention} ${deadline.todo} for ${eventName} is due today!`
        // );
        webhook
          .send(
            `${roleMention} ${deadline.todo} for ${eventName} is due today!`
          )
          .catch(console.error);
      }
    });
  });

  // msg.react("👍");
};

// addEvent YYYY-MM-DD eventName
//exports.addEventDeadlines = async (client, msg) => {
exports.addEventDeadlines = async (client, msg) => {
  var content = msg.content.substr(msg.content.indexOf(" ") + 1);
  var eventDate = content.split(" ")[0];
  eventDate = new Date(eventDate);
  var eventName = content.substr(content.indexOf(" ") + 1);

  var roomBookDue = new Date(eventDate);
  roomBookDue.setDate(eventDate.getDate() - 31);

  const deadlines = {
    date: eventDate,
    name: eventName,
    deadlines: [
      {
        due: roomBookDue,
        officer: "815429572891770901",
        todo: "Room Booking",
      },
    ],
  };

  addEvent(deadlines);

  console.log(deadlines);

  msg.react("👍");
};
