const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const prefix = "!";
client.commands = new Discord.Collection();

const aufträge12 = require("./aufträge/12.json");
const aufträge13 = require("./aufträge/13.json");
const aufträge14 = require("./aufträge/14.json");
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log('Bot initialized');
    //console.log(JSON.stringify(jsonObj));
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //if (!client.commands.has(command)) return;
    //only accept messages from this Channel: test-1
    if (!message.channel == config.channel) return;
    try {
        if(command == "auftrag") {
            if(args[0] == '11') {
                var argumentz = 0
                client.commands.get('auftrag11').execute(message, argumentz);
            }

            else if(args[0] == '12') {
                client.commands.get('auftrag12').execute(message);
            }

            else if(args[0] == '13') {
                client.commands.get('auftrag13').execute(message);
            }

            else if(args[0] == '14') {
                client.commands.get('auftrag14').execute(message);
            }
            
            else if(args[0] == '15') {
                client.commands.get('auftrag15').execute(message);
            }
        } 
    } catch (error) {
        console.log(error);
        message.reply(`Oooops. Da gab es wohl einen Fehler! (Failed to execute command. ${error})`);
    }
});

client.login(config.BOT_TOKEN);