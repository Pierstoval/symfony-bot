/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const pjson = require('./../package.json');
const logger = require("./util/logger");

// Birth of the legend.
logger.log(`Initializing SymfonyBot v${pjson.version}`);

// Load all the discord events we listen for.
require("./util/eventLoader")(client);

// Load all the commands into the client.
client.commands = new Discord.Collection();
fs.readdir("./src/commands/", (err, files) => {
    if (err) console.error(err);

    files.forEach(f => {
        const props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
    });
});

// Check if a member has the correct permissions.
client.elevation = message => {
    const staffRole = message.guild.roles.find("name", "Staff");

    if (staffRole && message.member.roles.has(staffRole.id)) {
        return 10;
    }

    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        return 1;
    }

    // Not enough permissions :(
    return 0;
};

// It seems discordjs completely ignores messageReaction events. Let's fetch them raw.
client.on('raw', async event => {
    const events = {
        MESSAGE_REACTION_ADD: 'messageReactionAdd',
        MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    };

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const channel = client.channels.get(data.channel_id);

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    client.emit(events[event.t], reaction, message.member);
});

// Thunderbirds are go!
client.login(process.env.TOKEN);
