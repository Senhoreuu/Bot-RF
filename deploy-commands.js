const { REST, Routes } = require('discord.js');
const tokens = require('./tokens.js');

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(tokens.token);

(async () => {
    try {
        console.log('Updating Commands');

        await rest.put(
            Routes.applicationGuildCommands(tokens.client_id, tokens.guild_id),
            { body: commands }
        )
    }
    catch (e) {
        return console.error(e);
    }

    console.log('Commands Update');
})();