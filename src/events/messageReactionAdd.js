/*!
 * This file is part of the Symfony Bot package.
 *
 * (c) Ricardo de Vries <ricardo@43.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = async (reaction, user) => {

    switch (reaction.emoji.name) {
        case "✔":
            // @todo: We might want to also filter to message 568338293603696642
            //        but for now there is only one message in the #rules channel.
            if (reaction.message.channel.id === '568036860471934986') {
                const member = reaction.message.member.guild.members.get(user.id);
                member.addRole('568071115990237184' /* Role: Community Member */);
            }
            break;
        default:
            break;
    }

};
