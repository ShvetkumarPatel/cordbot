//https://discordapp.com/oauth2/authorize?client_id=713399347320193174&scope=bot&permissions=464896
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Ready to Boom `);
});

client.on('message', msg => {
  if (msg.content === 'Hello') {
    msg.reply('Hey!');
  }
});

client.login(process.env.TOKEN);