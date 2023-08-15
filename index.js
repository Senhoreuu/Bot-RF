const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const tokens = require('./tokens.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command['data'] && command['execute']) {
        client.commands.set(command.data.name, command);
    }
    else console.error('Comando não permitido: ' + filePath);
}

console.log(client.commands);

client.on('ready', () => {
    console.log(`Logado como ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        return interaction.reply({ content: 'Comando não encontrado.', ephemeral: true });
    }

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(`Comando negado: ${error}`);
        return interaction.reply({ content: 'Não foi possível concluir.', ephemeral: true });
    }
});

client.login(tokens.token);

process.on('SIGINT', () => {
    process.exit(0);
});