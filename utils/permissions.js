exports.checkPermissions = (msg, role) => {
  console.log(msg.member.roles.cache);
  //console.log(role);
  if (
    msg.member.roles.cache.find(
      (r) => r.name.toLowerCase() === role.toLowerCase()
    )
  ) {
    return true;
  } else {
    msg.reply("Access denied to command");
    return false;
  }
};
