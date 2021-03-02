const Discord = require("discord.js");

exports.sendCommands = (msg, emoji) => {
  commands = [
    `${emoji} !help: To get the list of commands`,
    `${emoji} !todo <role>: To see the list of todo and their indexes for your team`,
    `${emoji} !addTodo <role> <idea>: To add an idea for your team (each idea will get assigned a random index)`,
    `${emoji} !removeTodo <role> <idea-index>: To remove the idea from your team`,
  ];

  if (msg.member.roles.cache.find((r) => r.name === "Officers")) {
    officerCommands = [
      `${emoji} !ideas: To see the list of ideas and their indexes for next meeting agenda`,
      `${emoji} !addIdea <idea>: To add an idea for next meeting agenda (each idea will get assigned a random index)`,
      `${emoji} !removeIdea <idea-index>: To remove the idea from next meeting agenda`,
      `${emoji} !message <channelID> <message>: To send a message to a channel`,
      // `${emoji} !dm <userID> <message>: To send a dm to a user`,
      `${emoji} !stream <stream-link> <event-name>: Sets activity to - playing event and shows Twitch link if available`,
      `${emoji} !stopStream: Sets activity - to listening to !help`,
    ];
    commands = commands.concat(officerCommands);
  }

  msg.channel.send("These are the commands you can use (not case-sensitive):");
  const embed = new Discord.MessageEmbed()
    .setTitle("Command List")
    .setColor(0x2b85d3)
    .setDescription(commands);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};
