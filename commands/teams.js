const Discord = require("discord.js");

exports.createTeams = async (client, msg) => {
  const details = msg.content.substr(msg.content.indexOf(" ") + 1);
  const category = details.split(" ")[0];
  const groupName = details.split(" ")[1];

  var role = await msg.guild.roles.create({
    data: { name: groupName, mentionable: true, color: "#C1E1C1" },
  });

  permissions = [
    {
      id: msg.guild.id,
      deny: ["VIEW_CHANNEL"],
      type: "role",
    },
    {
      id: role.id,
      allow: ["VIEW_CHANNEL"],
      type: "role",
    },
  ];

  var groupChannel = await msg.guild.channels.create(groupName, {
    type: "text",
    parent: category,
    permissionOverwrites: permissions,
  });

  var groupVoiceChannel = await msg.guild.channels.create(groupName + " VC", {
    type: "voice",
    parent: category,
    permissionOverwrites: permissions,
  });

  msg.react("👍");
};
