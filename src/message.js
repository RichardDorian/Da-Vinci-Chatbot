const { Message, MessageEmbed } = require('discord.js');
const openai = require('./utils/openai');
const { store } = require('./utils/Store');

/**
 * Triggered when a message is sent
 * @param {Message} message
 */
async function onMessage(message) {
  const id = message.author.id;
  if (!Object.prototype.hasOwnProperty.call(store, id)) return;
  if (message.content.startsWith('>')) return;

  const oldStore = store[id];

  store[id] += `\nHuman: ${message.content}`;
  const answer = await openai.getResponse(store[id], id);

  if (answer.length < 2) {
    store[id] = oldStore;
    console.error(new Error('Answer is too short', answer));
    return message.channel.send({
      embeds: [
        new MessageEmbed({
          title: 'Something is wrong in there',
          description:
            'I am not able to answer you! Try again with a better sentence',
          color: 'RED',
          footer: {
            text: '⚠️ This is not a message from GPT-3!',
          },
        }),
      ],
    });
  }

  message.channel.send(answer.replaceAll('\n\n', '\n'));
}

module.exports = onMessage;
