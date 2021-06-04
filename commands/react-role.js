const Discord = require('discord.js');
const { loggerInfo, loggerError } = require('../utils/logging.js');
const fs = require('fs');
const path = require('path');

//prod
// const memberRoleID = "756049478330613801";
// const rulesChannelID = "756053715563315221";
//dev
const memberRoleID = '756046335832096789';
const rulesChannelID = '756050285842923561';
const rolesChannelID = '755653627959443532';
const reactionRolesMapping = new Map([
  // all these are prod values
  ['👍', memberRoleID],
  ['🥳', '850173831049904169'],
  ['❓', '828768969808674836'],
  ['💫', '850173983453741057'],
]);

exports.sendRulesReaction = async (msg) => {
  const text = fs.readFileSync(path.resolve(__dirname, '../rules.txt'), 'utf8');
  const rules = text.split('\n');

  const agreement = rules.slice(16, 23);

  const embedRules = new Discord.MessageEmbed()
    .setTitle('Community Guidelines and Rules')
    .setColor(0x2b85d3)
    .setDescription(rules.slice(0, 15));
  msg.channel.send(embedRules);

  const embedAgreement = new Discord.MessageEmbed()
    .setTitle('Agreement to Community Guidelines and Rules')
    .setColor(0x2b85d3)
    .setDescription(agreement);
  let agreementMsg = await msg.channel.send(embedAgreement);
  agreementMsg.react('👍');

  msg.delete({ timeout: 1000 });
};

exports.sendRolesReaction = async (msg) => {
  const embedRoles = new Discord.MessageEmbed()
    .setTitle('Role Notifications')
    .setColor(0x2b85d3)
    .setDescription(
      `React with certain emojis to gain certain roles to get notifications!
      🥳 Partner Events
      ❓ QOTW
      💫 Weekly Fun Facts`
    );
  let rolesMsg = await msg.channel.send(embedRoles);
  rolesMsg.react('🥳');
  rolesMsg.react('❓');
  rolesMsg.react('💫');

  msg.delete({ timeout: 1000 });
};

exports.addRole = async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (
    (reaction.message.channel.id === rulesChannelID) |
    (reaction.message.channel.id === rolesChannelID)
  ) {
    if (reactionRolesMapping.has(reaction.emoji.name)) {
      try {
        user = await reaction.message.guild.members.cache.get(user.id);
        reactionID = reactionRolesMapping.get(reaction.emoji.name);
        if (user.roles.cache.find((r) => r.id === reactionID)) {
          user.roles.remove(reactionID);
        } else {
          user.roles.add(reactionID);
        }
        reaction.message.reactions.cache // remove reaction from the message
          .find((r) => r.emoji.name == reaction.emoji.name)
          .users.remove(user);
        loggerInfo(
          user.username +
            '#' +
            user.discriminator +
            ` was given role ${reaction.emoji.name}`
        );
      } catch (e) {
        console.log(e);
        loggerError(
          user.username +
            '#' +
            user.discriminator +
            ` was not given role ${reaction.emoji.name}`,
          e
        );
      }
    }
  }
};
