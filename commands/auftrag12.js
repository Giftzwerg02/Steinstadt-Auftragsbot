require('../config/defaults.js')
const textConfig = require('../config/texts.json')
const aufträge11 = require('../aufträge/12.json')

module.exports = {
    name: 'auftrag12',
    description: 'Auftrag mit der ID 12 ausführen',
    execute(message) {
        var rndmauftragsnummer12 = Math.floor(Math.random() * 24)
            message.delete();
            const embed = new Discord.MessageEmbed()
            .setTitle(`${aufträge12[rndmauftragsnummer12].nummer}`)
            .setDescription(`${aufträge12[rndmauftragsnummer12].fracht} \n
                            ${aufträge12[rndmauftragsnummer12].gewicht} \n
                            ${aufträge12[rndmauftragsnummer12].von}\n
                            ${aufträge12[rndmauftragsnummer12].nach} \n
                            ${aufträge12[rndmauftragsnummer12].transport} \n
                            ${aufträge12[rndmauftragsnummer12].maxSpd} \n
                            ${aufträge12[rndmauftragsnummer12].money} \n`)
            //.setImage('images/truck.jpg')
            .setFooter(`${hours}:${minutes} Auftrag von: ${message.author.username}`);

            //send the embed and react to them with an asynchronous function
            message.channel.send(embed)
                .then(async m => {
                    try {
                        await m.react('⌛')
                        await m.react('❌');
                    } catch (error) {
                        console.error('One of the emojis failed to react.');
                    }

                    //create the constants for the filters and the filters for the collectors
                    const filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    const collector1 = m.createReactionCollector(filter1, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                    const filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                    const collector2 = m.createReactionCollector(filter2, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                    const filter3 = (reaction, user) => reaction.emoji.name === '⌛' && user.id === message.author.id;
                    const collector3 = m.createReactionCollector(filter3, { max: 1, time: 5 * 60 * 1000 }); // 5 min



                    //run the code if the collector collects the '❌' emoji
                    collector2.on('collect', async () => {
                        try {
                            m.delete();
                        } catch(error) {
                            console.error('Failed to delete');
                        }
                    });

                    //run the code if the collector collects the '⌛' emoji
                    collector3.on('collect', () => {
                        m.react('✅')

                        //create the updated embed
                        const embed = new Discord.MessageEmbed()
                        .setColor('#64cf00')
                        .setTitle(`${aufträge12[rndmauftragsnummer12].nummer}`)
                        .setDescription(`${aufträge12[rndmauftragsnummer12].fracht} \n
                        ${aufträge12[rndmauftragsnummer12].gewicht} \n
                        ${aufträge12[rndmauftragsnummer12].von}\n
                        ${aufträge12[rndmauftragsnummer12].nach} \n
                        ${aufträge12[rndmauftragsnummer12].transport} \n
                        ${aufträge12[rndmauftragsnummer12].maxSpd} \n
                        ${aufträge12[rndmauftragsnummer12].money} \n`)
                        .setFooter(`${hours}:${minutes} Auftrag von: ${message.author.username} | Status: Angenommen`);

                        //edit the already existing embed with the updated one
                        m.edit(embed)

                        //run the code if the collector collects the '✅' emoji
                        collector1.on('collect', () => {
                            m.reactions.cache.get('✅').remove()
                            .catch(error => console.error('Failed to remove reactions: ', error));
                            m.reactions.cache.get('❌').remove()
                            .catch(error => console.error('Failed to remove reactions: ', error));
                            m.reactions.cache.get('⌛').remove()
                            .catch(error => console.error('Failed to remove reactions: ', error));

                            //create the updated embed
                            const embed = new Discord.MessageEmbed()
                            .setColor('#1e43fc')
                            .setTitle(`${aufträge12[rndmauftragsnummer12].nummer}`)
                            .setDescription(`${aufträge12[rndmauftragsnummer12].fracht} \n
                            ${aufträge12[rndmauftragsnummer12].gewicht} \n
                            ${aufträge12[rndmauftragsnummer12].von}\n
                            ${aufträge12[rndmauftragsnummer12].nach} \n
                            ${aufträge12[rndmauftragsnummer12].transport} \n
                            ${aufträge12[rndmauftragsnummer12].maxSpd} \n
                            ${aufträge12[rndmauftragsnummer12].money} \n`)
                            .setFooter(`${hours}:${minutes} Auftrag von: ${message.author.username} | Status: Abgeschlossen`);
                                    
                            //edit the already existing embed with the updated one
                            m.edit(embed)

                            
                            //make the HTTPRequest to the UNB API to give the user the amount of money he needs
                            var request = new XMLHttpRequest();
                            request.open("PATCH", `https://unbelievaboat.com/api/v1/guilds/${config.GUILD_ID}/users/${message.author.id}`);
                            request.setRequestHeader('Accept','application/json');
                            request.setRequestHeader('Authorization', config.AUHTORIZATION_TOKEN);
                            request.send(`{ "cash": 0, "bank": ${aufträge12[rndmauftragsnummer12].cash} }`);
                            console.log(`{ "cash": 0, "bank": ${aufträge12[rndmauftragsnummer12].cash} }`);
                            //request.send(`{ "cash": 0, "bank": 1 }`);  
                            var response = request.responseText;
                            request.onreadystatechange = function() {//Call a function when the state changes.
                                console.log(request.responseText);    
                            }
                            request.onloadend = function() {
                                //create the logs
                                fs.appendFileSync("logs/log.txt", `\n${day}-${month}-${year} \n` + 
                                `${hours}:${minutes}:${seconds}` + 
                                `\n${message.author.username} ID:${message.author.id} \n` + 
                                `${JSON.stringify(aufträge13[rndmauftragsnummer12], null, 4)}` + 
                                `\n${request.responseText}` + 
                                `\n-------------------------------------------------------------------------------------------------------- \n`);
                            }          
                        });
                    });
                })
                .catch(err => function() {
                    console.error(err);
                    message.channel.send("Etwas ist schiefgelaufen. error code: 0x00012")
                });
    },
};