global.Discord = require("discord.js")
global.client = new Discord.Client()
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

global.today = new Date()
global.year = today.getFullYear()
global.month = today.getMonth() + 1
global.day = ('0' + today.getDate()).slice(-2)
global.hours = ('0' + 2 + today.getHours()).slice(-2)
global.minutes = ('0' + today.getMinutes()).slice(-2)
global.seconds = ('0' + today.getSeconds()).slice(-2)