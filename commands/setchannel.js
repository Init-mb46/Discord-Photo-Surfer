const fs = require("fs");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Constants} = require("discord.js");
const discord = require("discord.js");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName("setchannel")
        .setDescription("Set the channel for the bot to grab images from by default")
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("The default channel")
                .setRequired(true)),
    async execute(interaction) {
        const {options} = interaction;
        const channel = options.getChannel("channel");
        if (channel != Constants.ChannelTypes.GUILD_TEXT) {
            await interaction.reply(
                {embed: [new MessageEmbed()
                    .setTitle("Set Channel")
                    .setDescription("Invalid channel type provided, only text channels are allowed.")
                    .setColor(Constants.Colors.BLURPLE)],
                epheremal: false});
            return;
        }
        await interaction.reply(`channel: ${channel}`);
    }
}
