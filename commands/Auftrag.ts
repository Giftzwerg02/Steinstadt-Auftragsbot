import { Global } from '../config/defaults'
import { unbRequest } from '../functions/request'
import { getAuftragsMsg } from '../functions/AuftragsMsg'
import { Message } from 'discord.js'
import { auftragToEmbed, createEmbedFooter } from '../functions/auftragToEmbed'

export class Auftrag {
    constructor(
        public name: string, 
        public description: string
    ) {}

    public async execute(message: Message, auftragsnummer: number) {        
        let tryDelete = (message: Message) => 
            message
                .delete()
                .catch(error => console.error(`Failed to delete: ${error}`)) 

        tryDelete(message)

        let auftragsMsg = getAuftragsMsg(auftragsnummer)
        let auftragsEmbed = auftragToEmbed(auftragsMsg, message.author.username)
        
        let sentMessage = await message.channel.send(auftragsEmbed)
        
        try {
            await sentMessage.react('⌛')
            await sentMessage.react('❌');
        } catch (error) {
            console.error('One of the emojis failed to react.');
        }

        // (emojis '✅' '❌' '⌛')
        const filter = (emoji: string) => (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id
        const collector = (emoji) => sentMessage.createReactionCollector(filter(emoji), { max: 1, time: 5 * 60 * 1000 })
    
        let onDeleteAuftrag = () => tryDelete(sentMessage)

        let acceptAuftrag = () => {
            sentMessage.react('✅')
            sentMessage.edit(
                auftragsEmbed
                    .setColor('#64cf00')
                    .setFooter(createEmbedFooter(message.author.username, "Angenommen"))
            )
        }

        let onCompleteAuftrag = () => {
            let removeReactions = (reactions: string[]) =>
                    reactions.forEach(reaction => 
                        sentMessage.reactions.cache.get(reaction)
                            .remove()
                            .catch(error => console.error(`Failed to remove reactions: ${error}`))) 
                    
            removeReactions(['✅', '❌', '⌛'])

            sentMessage.edit(
                auftragsEmbed
                    .setColor('#64cf00')
                    .setFooter(createEmbedFooter(message.author.username, "Abgeschlossen"))
            )
            
            //make the HTTPRequest to the UNB API to give the user the amount of money he needs
            unbRequest(message, auftragsMsg) 
        }

        collector('❌').on('collect', onDeleteAuftrag);

        collector('⌛').on('collect', () => {
            acceptAuftrag()
            collector('✅').on('collect', onCompleteAuftrag)
        });
    }
}