const { CommandInteraction, MessageEmbed } = require('discord.js');
const { store } = require('./utils/Store');
const { getResponse, defaultPrompt } = require('./utils/openai');

/**
 * Start conversation
 * @param {CommandInteraction} interaction
 */
async function startConversation(interaction) {
  const id = interaction.member.id;
  if (Object.prototype.hasOwnProperty.call(store, id))
    return await interaction.reply({
      embeds: [
        new MessageEmbed({
          title: 'Something is wrong in there',
          description: 'You already started a conversation with me!',
          color: 'RED',
          footer: {
            text: '⚠️ This is not a message from GPT-3!',
          },
        }),
      ],
      ephemeral: true,
    });
  store[id] = defaultPrompt + interaction.options.getString('message');

  const answer = await getResponse(store[id], id);

  interaction.reply(answer);
}

module.exports = startConversation;
