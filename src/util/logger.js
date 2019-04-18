/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "info") => {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;

    switch (type) {
        case "info": {
            return console.log(`${timestamp} ${chalk.black.bgGreen(`${type.toUpperCase()}`)} ${content}`);
        }

        case "warn": {
            return console.log(`${timestamp} ${chalk.black.bgYellow(`${type.toUpperCase()}`)} ${content}`);
        }

        case "error": {
            return console.log(`${timestamp} ${chalk.bgRed(`${type.toUpperCase()}`)} ${content}`);
        }

        default: throw new TypeError("Logger type must be either info, warn, or error.");
    }
};
