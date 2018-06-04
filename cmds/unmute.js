const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID.");

    let role = message.guild.roles.find(r => r.name === "Muted");

    if(!role || !toMute.roles.has(role.id)) return message.channel.send("You are now unmuted.");

    await toMute.removeRole(role);

    delete bot.mutes[toMute.id];

    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
        if(err) throw err;
        console.log(`I have unmuted ${toMute.user.tag}.`);
        message.channel.send("Is now unmuted");
    });
}

module.exports.help = {
    name: "unmute"
}