const { CommandInteraction, MessageEmbed } = require('discord.js');
const { store } = require('./utils/Store');

/**
 * Start conversation
 * @param {CommandInteraction} interaction
 */
async function stopConversation(interaction) {
  if (!Object.prototype.hasOwnProperty.call(store, interaction.member.id))
    return interaction.reply({
      embeds: [
        new MessageEmbed({
          title: 'Something is wrong in there',
          description: "You don't have any conversation with me!",
          color: 'RED',
          footer: {
            text: '⚠️ This is not a message from GPT-3!',
          },
        }),
      ],
    });

  delete store[interaction.member.id];
  interaction.reply({
    embeds: [
      new MessageEmbed({
        title: 'Conversation stopped',
        description:
          'You can start a new conversation with me using the `/start` slash command!',
        color: 'GREEN',
      }),
    ],
  });
}

module.exports = stopConversation;
