const Discord = require("discord.js");

exports.sendCommands = (msg) => {
  const emoji = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");

  commands = [
    `${emoji} !help: To get the list of commands`,
    `${emoji} !todo <role>: To see the list of todo and their indexes for your team`,
    `${emoji} !addTodo <role> <idea>: To add an idea for your team (each idea will get assigned a random index)`,
    `${emoji} !removeTodo <role> <idea-index>: To remove the idea from your team`,
  ];

  if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
    officerCommands = [
      " \n\n ** Officer Commands **",
      `${emoji} !ideas: To see the list of ideas and their indexes for next meeting agenda`,
      `${emoji} !addIdea <idea>: To add an idea for next meeting agenda (each idea will get assigned a random index)`,
      `${emoji} !removeIdea <idea-index>: To remove the idea from next meeting agenda`,
      `${emoji} !message <channelID> <message>: To send a message to a channel`,
      `${emoji} !stream <stream-link> <event-name>: Sets activity to - playing event and shows Twitch link if available`,
      `${emoji} !stopStream: Sets activity - to listening to !help`,
      `${emoji} !qotd <senderName>|<question>: Sends question to qotd channel and tags senderName before`,
    ];
    commands = commands.concat(officerCommands);
  }

  if (msg.member.roles.cache.find((r) => r.name === "Developers")) {
    devCommands = [
      " \n\n ** Developer Commands **",
      `${emoji} !rules: To send rules and react-role stuff`,
      `${emoji} !clubinfo: To send club info`,
      `${emoji} !officers: To send officer info`,
      `${emoji} !deleteofficers: To delete officer info`,
    ];
    commands = commands.concat(devCommands);
  }

  msg.channel.send("These are the commands you can use (not case-sensitive):");
  const embed = new Discord.MessageEmbed()
    .setTitle("Command List")
    .setColor(0x2b85d3)
    .setDescription(commands);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};
