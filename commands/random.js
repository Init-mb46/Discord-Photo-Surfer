const fs = require("fs");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName("getrandom")
        .setDescription("Get a random photo from the default channel, or the provided channel")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("Search from this channel")
                .setRequired(false)),
    async execute(interaction) {

    }
}