//https://discordapp.com/oauth2/authorize?client_id=713399347320193174&scope=bot&permissions=464896
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');
const axios = require('axios');
const fs = require('fs');
const bot = new Discord.Client();



client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.startsWith("!")) {
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
    else if (fullCommand == "jokes"){
        jokeCommand(receivedMessage)
    }
    else if (primaryCommand == "userinfo"){
        userinfoCommand (receivedMessage)
    }
    else if (primaryCommand == "emoji"){
        emojiCommand(arguments, receivedMessage)
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

function jokeCommand(receivedMessage){
    receivedMessage.channel.send("joke1")
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
    .addField("Created At", receivedMessage.author.createdAt)
    .setFooter('You are the member of cordbot family', 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Cb-logo-sans-words-transparent-bg.png');
    receivedMessage.react("👍")
     receivedMessage.channel.send(exampleEmbed)
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
        receivedMessage.channel.send('This is a koala!', {files:       ['https://www.tav.ca/wp-content/uploads/2020/01/tav-logo.png']});
    }
    else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!image [topic]`")
    }
    
}



client.login(process.env.TOKEN);