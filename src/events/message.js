/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = async (message) => {

    const {client} = message;
    const messagePrefix = process.env.PREFIX;

    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    if (message.content.startsWith(messagePrefix)) {
        const command = message.content.split(" ")[0].slice(messagePrefix.length);
        const params = message.content.split(" ").slice(1);
        const perms = client.elevation(message);

        let cmd;

        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        }

        if (cmd) {
            if (perms < cmd.conf.permLevel) return;

            cmd.run(client, message, params, perms);
        }
    }

};
