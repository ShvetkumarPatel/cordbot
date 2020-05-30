//https://discordapp.com/oauth2/authorize?client_id=713399347320193174&scope=bot&permissions=464896
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch') 
const weather = require('weather-js');
const axios = require('axios');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
const ytdl = require("ytdl-core");
const queue = new Map();
let days = 0;
let week = 0;
const moment = require("moment");

bot.commands = new Discord.Collection();
 
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
    
    if (receivedMessage.content.startsWith("/")) {
        processCommand(receivedMessage)
    }
    
   // receivedMessage.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)
})


function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } 
    else if (primaryCommand == "image") {
        imageCommand(arguments, receivedMessage)
    } 
    else if (primaryCommand == "userinfo"){
        userinfoCommand (receivedMessage)
    }
    else if (primaryCommand == "emoji"){
        emojiCommand(arguments, receivedMessage)
    }
    else if(fullCommand == "info"){
        infoCommand(receivedMessage)
    }
    else if(fullCommand == "serverinfo"){
        serverinfoCommand(receivedMessage)
    }
    else if(fullCommand == "rolldice"){
        rolldiceCommand(receivedMessage)
    }
    else if(primaryCommand == "setbotstatus"){
        setbotstatusCommand(arguments, receivedMessage)
    }
    else if(primaryCommand == "setafk"){
        setafkCommand(arguments,receivedMessage)
    }

    else {
        receivedMessage.channel.send("I don't understand the command. Try `!help command`")
    }
}


function helpCommand(arguments, receivedMessage) {
    if (receivedMessage.content.includes("command")) {
        receivedMessage.channel.send("It looks like you might need help with command. Here is the list. 1.`!help [topic]` 2. `!multiply 2 4 10` 3. `!image [topic]` " )
    } 
    else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help command`")
    }
}

function emojiCommand (arguments, receivedMessage){
    if(receivedMessage.content.includes("smile")){
        receivedMessage.channel.send("😀")
    }
    else if(receivedMessage.content.includes("bestluck")){
        receivedMessage.channel.send("👍")
    }
    else if(receivedMessage.content.includes("redheart"))
    {
        receivedMessage.channel.send("💖")
    }
    else {
        receivedMessage.channel.send("Try `!emoji [type of emoji]`")
    }
}

function userinfoCommand(receivedMessage){
    const exampleEmbed = new Discord.MessageEmbed()
	.setTitle('User Info')
	//.setURL('https://discord.js.org/')
	.setAuthor(receivedMessage.author.username, 'https://pitcoder.github.io/img/portfolio/thumbnails/avatar.png', 'https://discord.gg/BnsRHR')
	.setDescription('The User Information are as follow')
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/e/eb/Cb-logo-sans-words-transparent-bg.png')
	.setImage('https://i.ya-webdesign.com/images/welcome-banner-png-2.png')
    .setTimestamp()
    .addField("Full Username", `${receivedMessage.author.username}  `)
    .addField("ID", receivedMessage.author.id)
    .addField("Created At", `${moment(receivedMessage.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
    .setFooter('You are the member of cordbot family', 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Cb-logo-sans-words-transparent-bg.png');
    receivedMessage.react("👍")
     receivedMessage.channel.send(exampleEmbed)
}

function rolldiceCommand(receivedMessage){
    
    var dice = [1, 2, 3, 4, 5, 6];
    let ExampleEmbed = new Discord.MessageEmbed()
        .setColor("#15f153")
        .addField("First dice", dice[Math.floor(Math.random()*dice.length)], true)
        .addField("Second dice", dice[Math.floor(Math.random()*dice.length)], true)
        .setTimestamp();

     receivedMessage.channel.send(ExampleEmbed);    
}


function infoCommand(receivedMessage){
    let uptime = ``;
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){
        days = days + 1;
        hours = 0;
    }

    if(days == 7){
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let Exampleembed = new Discord.MessageEmbed()
        .setColor("#9400D3")
        .setAuthor(`shvep`, client.user.displayAvatarURL)
        .addField(`Version`,`1.0`, true)
        .addField(`Library`,`Discord.js` , true)
        .addField(`Creator`,`Shpatel#6678`, true)
        .addField(`Invite`, `[Invite Cordbot Shvet](https://discordapp.com/oauth2/authorize?client_id=713399347320193174&scope=bot&permissions=26)`, true)
        .setFooter(`Uptime: ${uptime}`);

    receivedMessage.channel.send(Exampleembed);    
}


    function serverinfoCommand(receivedMessage){
        let member = receivedMessage.mentions.members.first();
 let uptime = ``;
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){
        days = days + 1;
        hours = 0;
    }

    if(days == 7){
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

    uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let Exampleembed = new Discord.MessageEmbed()
        .setColor("#228B22")
        .addField('Uptime', uptime);

    receivedMessage.channel.send(Exampleembed)
    }

    function setbotstatusCommand(arguments,receivedMessage){
        const setStatus = receivedMessage.content.split(' ');
        if(!receivedMessage.member.hasPermission("ADMINISTATOR")){
            return receivedMessage.channel.send("You don't have the permissions to use this command!");
        }
    
        else if(setStatus[1] === 'idle'){
            client.user.setStatus('idle')
                .then(receivedMessage.channel.send("My status has been set to: "+setStatus[1]))
                .catch(console.error);
        } 
    
        else if(setStatus[1] === 'online'){
            client.user.setStatus('online')
                .then(receivedMessage.channel.send("My status has been set to: "+ setStatus[1]))
                .catch(console.error);
        }
    
        else if(setStatus[1] === 'invisible'){
            client.user.setStatus('invisible')
                .then(receivedMessage.channel.send("My status has been set to: "+ setStatus[1]))
                .catch(console.error);
        }
    
        else if(setStatus[1] === 'dnd'){
            client.user.setStatus('invisible')
                .then(receivedMessage.channel.send("My status has been set to: "+ setStatus[1] + "(do not disturb)"))
                .catch(console.error);
        }
    
        else{
            return receivedMessage.channel.send("I could not set my status please type one of the following status: idle, online, invisible, dnd (do not disturb)");
        }
    
    }
 
function setafkCommand(arguments,receivedMessage){
    const setStatus = receivedMessage.content.split(' ');

    if(setStatus[1] === 'afk'){
        client.user.setAFK(true);
        receivedMessage.channel.send("Your status has been set to afk!");
    }

    else if(setStatus[1] === 'notafk'){
        client.user.setAFK(false);
        receivedMessage.channel.send(`Welcome back ${receivedMessage.author}`);
    }

    else if(!setStatus[1] || setStatus[1] === undefined){
        receivedMessage.channel.send("You did not choose afk or notafk as current status!");
    }

    else{
        receivedMessage.channel.send("You did not choose afk or notafk as current status!");
    }
}


function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}


function imageCommand(arguments, receivedMessage) {
    if (receivedMessage.content.includes("koala")) {
        receivedMessage.channel.send('This is a koala!', {files:       ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/480px-Koala_climbing_tree.jpg']});
    } 
    else if (receivedMessage.content.includes("tav")){
        receivedMessage.channel.send('This is a tav!', {files:       ['https://www.tav.ca/wp-content/uploads/2020/01/tav-logo.png']});
    }
    else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!image [topic]`")
    }
    
}

var jokes = [
    { name: 'Dozen', answer: 'anybody want to let me in?' },
    { name: 'Avenue', answer: 'knocked on this door before?' },
    { name: 'Ice Cream', answer: 'if you don\'t let me in!' },
    { name: 'Adore', answer: 'is between us. Open up!' },
    { name: 'Lettuce', answer: 'in. Its cold out here!' },
    { name: 'Bed', answer: 'you can not guess who I am.' },
    { name: 'Al', answer: 'give you a kiss if you open the door.' },
    { name: 'Olive', answer: 'you!' },
    { name: 'Abby', answer: 'birthday to you!' },
    { name: 'Rufus', answer: 'the most important part of your house.' },
    { name: 'Cheese', answer: 'a cute girl.' },
    { name: 'Wanda', answer: 'hang out with me right now?' },
    { name: 'Ho-ho.', answer: 'You know, your Santa impression could use a little work.' },
    { name: 'Mary and Abbey.', answer: 'Mary Christmas and Abbey New Year!' },
    { name: 'Carmen', answer: 'let me in already!' },
    { name: 'Ya', answer: 'I’m excited to see you too!' },
    { name: 'Scold', answer: 'outside—let me in!' },
    { name: 'Robin', answer: 'you! Hand over your cash!' },
    { name: 'Irish', answer: 'you a Merry Christmas!' },
    { name: 'Otto', answer: 'know whats taking you so long!' },
    { name: 'Needle', answer: 'little help gettin in the door.' },
    { name: 'Luke', answer: 'through the keyhole to see!' },
    { name: 'Justin', answer: 'the neighborhood and thought Id come over.' },
    { name: 'Europe', answer: 'No, you are a poo' },
    { name: 'To', answer: 'To Whom.' },
    { name: 'Etch', answer: 'Bless You!' },
    { name: 'Mikey', answer: 'doesnt fit through this keyhole' }
]
// Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html
var emojis = [
    { name: 'heart', answer: '💖' },
    { name: 'Best wishes', answer: '👍' },
    { name: 'ROFL', answer: '😂' },
    { name: 'Felling Blessed', answer: '😇' },
    { name: 'Kiss', answer: '😘' },
    { name: 'Can I have hug', answer: '🤗' },
    { name: 'Shhhh...!', answer: '🤫' },
    { name: 'Corona', answer: '😷' },
    { name: 'Do not Angry me', answer: '😡' },
    { name: 'Shy', answer: '🙈' },
    { name: 'Yo', answer: '🤟' },
]

var coins = [
    { name:"Coin is in the air....", answer:"...........And you get heads...!"},
    { name:"Coin is rolling", answer:"...........And You get tail...!"} 
]


//choosing a random joke from the array

var knock = function() {
    var joke = jokes[Math.floor(Math.random() * jokes.length)]
    return formatJoke(joke)
}
var emoji = function(){
    var emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return formatEmoji(emoji)
}
var coin = function(){
    var coin = coins[Math.floor(Math.random() * coins.length)]
    return formatCoin(coin)
}



//Formatting the output to return in a new line and plug in the output variables
function formatJoke(joke) {
    return [
        'Knock, knock.',
        'Who’s there?',
        joke.name + '.',
        joke.name + ' who?',
        joke.name + ' ' + joke.answer
    ].join('\n')
}

function formatEmoji(emoji){
    return[
        emoji.name + '' + emoji.answer
    ].join('\n')
}

function formatCoin(coin){
    return[
        coin.name + '' + coin.answer
    ].join('\n')
}




//Function knock() returns the formatted joke
client.on('message', (message) => {
   
    if (message.content.includes('/knock')) {
        const msg = message.content.split(' ');

            message.reply(knock());
    }
    else if (message.content.includes("/emoji")){
        const msg = message.content.split('');

            message.reply(emoji());
    }
    else if (message.content.includes("/flipcoin")){
        const msg = message.content.split('');

            message.reply(coin());
    }


    mention = message.mentions.users.first();
    if (message.content.includes("/send")){
        if (mention == null) { return; }
        message.delete();
        mentionMessage = message.content.slice (8);
        mention.send(mentionMessage);
        message.channel.send("Done...!")

    } 

});

client.login(process.env.TOKEN);