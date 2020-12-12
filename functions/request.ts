import { Global } from '../config/defaults'
import { BOT_TOKEN, channel, GUILD_ID, AUHTORIZATION_TOKEN } from '../config/config.json'
import { Message } from 'discord.js'
import { appendFileSync } from 'fs'
import { AuftragsMsg } from './AuftragsMsg'

export function unbRequest(message: Message, auftragsMsg: AuftragsMsg) {
    let request = createRequest(message, auftragsMsg)
    request.onreadystatechange = () => console.log(request.responseText) 
    request.onloadend = createLogs

    function createLogs() {
        appendFileSync("logs/log.txt", 
            `\n${Global.day()}-${Global.month()}-${Global.year()}\n` + 
            `${Global.hours()}:${Global.minutes()}:${Global.seconds()}` + 
            `\n${message.author.username} ID:${message.author.id}\n` + 
            `${JSON.stringify(auftragsMsg.json, null, 4)}` + 
            `\n${request.responseText}` + 
            `\n-------------------------------------------------------------------------------------------------------- \n`
        )
    }
}

function createRequest(message: Message, auftragsMsg: AuftragsMsg) {
    let request = new XMLHttpRequest()
    request.open("PATCH", `https://unbelievaboat.com/api/v1/guilds/${GUILD_ID}/users/${message.author.id}`)
    request.setRequestHeader('Accept','application/json')
    request.setRequestHeader('Authorization', AUHTORIZATION_TOKEN)
    request.send(`{ "cash": 0, "bank": ${auftragsMsg.cash} }`)
    console.log(`{ "cash": 0, "bank": ${auftragsMsg.cash} }`)
    return request
}

