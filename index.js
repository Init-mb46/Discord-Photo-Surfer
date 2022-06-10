const {Client, MessageEmbed, Intents, Collection, Constants, Interaction} = require("discord.js");
const fs = require("fs");
const token = fs.existsSync("./Token.json") ? require("./Token.json").Token : process.env.Token;
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");

//https://discord.com/api/oauth2/authorize?client_id=984611840430587934&permissions=2147526656&scope=bot%20applications.commands

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const guildID = "888614958647103518";
const guild = client.guilds.cache.get(guildID);
const clientID = "984611840430587934";
const cmdFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
client.commands = new Collection();
const commands = []

for(const f of cmdFiles) {
    const cmd = require(`./commands/${f}`);
    client.commands.set(cmd.cmd.name, cmd);
    commands.push(cmd.cmd.toJSON());
}

const rest = new REST({version: '9'}).setToken(token);

(async () => {
    try {
        console.log("refreshing commands");

        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            {body: commands} // set commands here
        );
        await rest.put(
            Routes.applicationCommands(clientID),
            {body: []} // set global commands here
        );
        console.log("successfully registered commands");
    } catch (e) {
        console.error(e);
    }
})();

client.on("ready", async () => {
    console.log("bot online");
})

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isCommand()) return;
    try {
        await client.commands.get(interaction.commandName).execute(interaction);
    } catch (e) {
        console.log(e);
        await interaction.reply({
            content: `There was an error executing the **${interaction.commandName}** command`,
            ephemeral: true
        });
    }
})

client.login(token)