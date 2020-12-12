import { Global } from "../config/defaults"
import { AuftragsMsg } from "./AuftragsMsg"

const timestamp = () => `${Global.hours()}:${Global.minutes()}`
const from = (username) => `Auftrag von: ${username}`

export function auftragToEmbed(auftragsMsg: AuftragsMsg, username: string, color?: string) {
    const embed = new Global.Discord.MessageEmbed()
        .setTitle(auftragsMsg.title)
        .setDescription(auftragsMsg.title)
        .setFooter(`${timestamp}} | ${from(username)}`)

    if(color !== undefined)
        embed.setColor(color)
        
    return embed
}

export function createEmbedFooter(username: string, status: string) {
    return `${timestamp} | ${from(username)} | Status: ${status}`
}
