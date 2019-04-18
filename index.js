/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const dotenv = require('dotenv');

dotenv.config();

require('./src/bot'); // @todo: Find a better way to do this.
