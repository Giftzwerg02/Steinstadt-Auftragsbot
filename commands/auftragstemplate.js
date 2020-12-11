const Discord = require("discord.js");
const client = new Discord.Client();
const aufträge11 = require('C:/Users/kevin/OneDrive/Desktop/Programmieren/Steinstadt-Auftragsbot/aufträge/14.json');
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = ('0' + today.getDate()).slice(-2)
var hours = ('0' + 2 + today.getHours()).slice(-2);
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2);
var response;

module.exports = {
    name: 'auftrag12',
    description: 'Auftrag mit der ID 12 ausführen',
    execute(message) {

    },
};