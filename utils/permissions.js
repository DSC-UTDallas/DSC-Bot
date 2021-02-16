exports.checkPermissions = (msg, role) => {
  if (msg.member.roles.cache.find((r) => r.name === role)) {
    return true;
  } else {
    msg.reply("Access denied to command");
  }
};
