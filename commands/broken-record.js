const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, userMention } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registrar')
        .setDescription('Registre um Recorde!')
        .addChannelOption(option =>
            option
                .setName('canal')
                .setDescription('Canal para qual a Embed será enviada.')
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('recordista')
                .setDescription('Recordista')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('raro')
                .setDescription('Nome do Raro')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('quantidade')
                .setDescription('Quantidade de Raros')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('imagem')
                .setDescription('URL da imagem')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        const user = interaction.user;

        const channel = interaction.options.getChannel('canal');
        const target = interaction.options.getUser('target');
        const rare = interaction.options.getString('raro');
        const quantity = interaction.options.getString('quantidade');
        const img = interaction.options.getString('imagem');

        try {
            const embed = new EmbedBuilder()
                .setColor(15705895)
                .setTitle('**RECORDE QUEBRADO!**')
                .setThumbnail('https://cdn.discordapp.com/attachments/1115672752498675762/1115672849915588708/RECORDES_DE_FERRO_PATO_SEM_FUNDO.png')
                .setDescription(`Um recorde foi quebrado na Recordes de Ferro!\n\n> 🏆 **Recordista:** ${userMention(target.id)}\n> 💎 **Raro:** ${rare}\n> 📌 **Quantidade:** ${quantity}\n\n*Acha que é capaz de quebrar este recorde?*`)
                .setImage(img)
                .setTimestamp()
                .setFooter({ text: `Recorde registrado por ${user.globalName}`, iconURL: 'https://cdn.ironhotel.org/static_iron/c_images/album1584/RF01.gif' });

            await channel.send({ embeds: [embed] });

            await interaction.reply({ content: 'Recorde Registrado!', ephemeral: true });
        }
        catch (e) {
            console.error(`Comando negado: ${e}`);
            interaction.reply({ content: 'Não foi possível registrar o Recorde!', ephemeral: true })
        }
    }
};