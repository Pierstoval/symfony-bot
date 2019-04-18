/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const logger = require("../util/logger");

module.exports = async (client) => {

    logger.log(`Authenticated to Discord as ${client.user.tag}`, 'info');

};
