import Discord from 'discord.js'

export class Global {

    static Discord = Discord
    static client = new Discord.Client()
    static today = () => new Date()
    static year = () => new Date().getFullYear()
    static month = () => new Date().getMonth() + 1
    static day = () => ('0' + new Date().getDate()).slice(-2)
    static hours = () => ('0' + 2 + new Date().getHours()).slice(-2)
    static minutes = () => ('0' + new Date().getMinutes()).slice(-2)
    static seconds = () => ('0' + new Date().getSeconds()).slice(-2)

}