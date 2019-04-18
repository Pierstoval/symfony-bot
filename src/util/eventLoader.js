/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const reqEvent = event => require(`../events/${event}`);

module.exports = client => {
    client.on("ready", () => reqEvent("ready")(client));
    client.on("message", reqEvent("message"));
    client.on("messageReactionAdd", reqEvent("messageReactionAdd"))
};
