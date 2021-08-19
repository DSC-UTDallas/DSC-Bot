const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const { GETevents, addEvent } = require("../utils/firebase");

//exports.getEventDeadlines = async (client, msg) => {
exports.getEventDeadlines = async () => {
  // const webhook = new Discord.WebhookClient(id, token);
  const webhook = new Discord.WebhookClient(
    process.env.deadline_webhook_id,
    process.env.deadline_webhook_token
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
exports.addEventDeadlines = async (client, msg) => {
  var content = msg.content.substr(msg.content.indexOf(" ") + 1);
  var eventDate = content.split(" ")[0];
  eventDate = new Date(eventDate);
  eventDate.setDate(eventDate.getDate() + 1);
  var eventName = content.substr(content.indexOf(" ") + 1);

  const eventLead = "656976873926033422";
  const eventCommittee = "720137870647492669";
  const financialLead = "656976951143301166";
  const adminLead = "679809964046417960";

  var roomBookDue = new Date(eventDate);
  roomBookDue.setDate(eventDate.getDate() - 24);

  var flyerDue = new Date(eventDate);
  flyerDue.setDate(eventDate.getDate() - 22);

  var programmingFundsDue = new Date(eventDate);
  programmingFundsDue.setDate(eventDate.getDate() - 21);

  var flyerRequestDue = new Date(eventDate);
  flyerRequestDue.setDate(eventDate.getDate() - 15);

  var reimburesementDue = new Date(eventDate);
  reimburesementDue.setDate(eventDate.getDate() + 5);

  var postEventDue = new Date(eventDate);
  postEventDue.setDate(eventDate.getDate() + 5);

  const deadlines = {
    date: eventDate,
    name: eventName,
    deadlines: [
      {
        due: roomBookDue,
        officer: eventLead,
        todo: "Room Booking",
      },
      {
        due: flyerDue,
        officer: eventCommittee,
        todo: "Final Flyer Design",
      },
      {
        due: programmingFundsDue,
        officer: financialLead,
        todo: "Programming Funds Form",
      },
      {
        due: flyerRequestDue,
        officer: eventLead,
        todo: "SOC Flyer Request",
      },
      {
        due: reimburesementDue,
        officer: financialLead,
        todo: "Reimbursement Form",
      },
      {
        due: postEventDue,
        officer: adminLead,
        todo: "Post Event Evaluation Form",
      },
    ],
  };

  addEvent(deadlines);
  msg.react("👍");
};
