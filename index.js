//https://discordapp.com/oauth2/authorize?client_id=713399347320193174&scope=bot&permissions=464896
//https://github.com/ShvetkumarPatel/cordbot

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

        if (fullCommand == "help") {
            helpCommand(receivedMessage)
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
        else if(fullCommand == "rolldice"){
            rolldiceCommand(receivedMessage)
        }
        else if(primaryCommand == "setbotstatus"){
            setbotstatusCommand(arguments, receivedMessage)
        }
        else if(primaryCommand == "setafk"){
            setafkCommand(arguments,receivedMessage)
        }
        else if(fullCommand == "uptime"){
            uptimeCommand(receivedMessage)
        }
        else if(fullCommand == "dog"){
            dogCommand(receivedMessage)
        }
        else if(fullCommand == "knock"){
            knockCommand(receivedMessage)
        }
        else if(fullCommand == "gesture"){
            gestureCommand(receivedMessage)
        }
        else if(fullCommand == "flipcoin"){
            flipcoinCommand(receivedMessage)
        }

        else {
            receivedMessage.channel.send("I don't understand the command. Try `/help`")
        }
    }


    //Help function to get all the commands list
    function helpCommand(receivedMessage) {
   
        const Exampleembed = new Discord.MessageEmbed()
            .setColor("#FF4500")
            .addField("Commands",`You can view commands at [github.com](https://github.com/ShvetkumarPatel/cordbot/blob/master/readme.md)`);
        receivedMessage.channel.send(Exampleembed);    
    }   


    //Emoji function to get particular emoji. You can extend by adding more and more else if
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
            receivedMessage.channel.send("Try `!emoji [type of emoji] for particular emoji`")
        }
    }


    //Dog function to get random image of cute dog
    function dogCommand(receivedMessage){
        var dogs = [
            'https://cdn.shopify.com/s/files/1/1324/6367/collections/Why_all_dogs_love_us_close_up_large.jpg?v=1487160259',
            'https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg',
            'https://woodsboroworld.com/wp-content/uploads/2018/04/scroll0015.jpg',
            'https://123callingalldogs.com/wp-content/uploads/2017/11/slide-4-1900x825_t.jpg',
            'https://i.pinimg.com/736x/63/0f/0e/630f0ef3f6f3126ca11f19f4a9b85243--dachshund-puppies-weenie-dogs.jpg',
            'http://www.insidedogsworld.com/wp-content/uploads/2016/03/Dog-Pictures.jpg',
            'https://i.huffpost.com/gen/3754046/original.jpg',
            'https://www.dogster.com/wp-content/uploads/2014/06/A-Doberman-puppy.jpg',
            'http://dogcatandman.com/wp-content/uploads/2015/09/doberman1.jpg',
            'https://petsidi.com/wp-content/uploads/2018/06/adopt-a-corgi-puppy.jpg',
            'https://www.pets4homes.co.uk/images/breeds/50/large/fdaffb675fe084458758d97f7bac468f.jpg',
            'https://www.lifegate.it/app/uploads/corgi-surf.jpg',
            'https://www.ideegreen.it/wp-content/uploads/2016/01/pastore-tedesco1.jpg',
            'http://puppytoob.com/wp-content/uploads/2016/09/Black-German-Shepherd-750x493.jpg'

        ];

        let Exampleembed = new Discord.MessageEmbed()
            .setColor("#15f153")
            .setDescription(`Oh look i found a cuty dog :dog:`)
            .setImage(dogs[Math.floor(Math.random()*dogs.length)]);

        return receivedMessage.channel.send(Exampleembed);   
    }


    //choosing a random joke from the array
    function knockCommand(receivedMessage){
        var jokes = [
            'Dozen...........Dozen, Who?.........anybody want to let me in?',
            'Avenue.........Avenue, whp?..........knocked on this door before?',
              'Ice Cream..........Ice Cream, who?.......if you don\'t let me in!' ,
            'Adore.....Adore, who?.........is between us. Open up!' ,
             'Lettuce....Lettuce,Who?.......in. Its cold out here!' ,
             'Bed,Who?.......you can not guess who I am.', 
             'Al,Who?.......give you a kiss if you open the door.', 
              'Abby,Who?.......birthday to you!' ,
              'Rufus,Who?.......the most important part of your house.', 
             'Cheese,Who?.......a cute girl.' ,
              'Wanda,Who?.......hang out with me right now?' ,
             'Ho-ho,Who?.......You know, your Santa impression could use a little work.' ,
              'Mary and Abbey,Who?.......Mary Christmas and Abbey New Year!' ,
              'Carmen,Who?.......let me in already!' ,
             'Ya,Who?.......I’m excited to see you too!' ,
              'Scold,Who?.......outside—let me in!' ,
             'Robin,Who?.......you! Hand over your cash!' ,
              'Irish,Who?.......you a Merry Christmas!' ,
               'Otto,Who?.......now whats taking you so long!' ,
             'Needle,Who?.......little help gettin in the door.' ,
              'Luke,Who?.......through the keyhole to see!' ,
              'Justin,Who?.......the neighborhood and thought Id come over.' ,
             '  Europe,Who?.......No, you are a poo' ,
             'To,Who?.......To Whom.' ,
              'Etch,Who?.......Bless You!' ,
              'Mikey,Who?.......doesnt fit through this keyhole' 
        ]
        let ExampleEmbed = new Discord.MessageEmbed()
        .setColor("#15f153")
        .addField("knock knock, Who?", jokes[Math.floor(Math.random()*jokes.length)], true)
        .setTimestamp();

    receivedMessage.channel.send(ExampleEmbed);   
    
    }

     //choosing a random emoji from the array
    function gestureCommand(receivedMessage){
        var gestures = [
           'heart............💖',
            'Best wishes..............👍',
             'ROFL...........😂',
            'Felling Blessed...........😇' ,
             'Kiss.........😘' ,
           'Can I have hug.......🤗' ,
             'Shhhh...!.🤫' ,
            'Corona...........😷' ,
           'Do not Angry me..........😡' ,
             'Shy......🙈' ,
            'Yo..............🤟' ,
        ]
        let ExampleEmbed = new Discord.MessageEmbed()
        .setColor("#15f153")
        .addField("Here you go.", gestures[Math.floor(Math.random()*gestures.length)], true)
        .setTimestamp();

    receivedMessage.channel.send(ExampleEmbed);  
    }


    function flipcoinCommand(receivedMessage){
        var coin = [
            'heads',
            'tail'
        ]
        let ExampleEmbed = new Discord.MessageEmbed()
        .setColor("#15f153")
        .addField("Here you go.", coin[Math.floor(Math.random()*coin.length)], true)
        .setTimestamp();

    receivedMessage.channel.send(ExampleEmbed);  
    }
         

    //used moment js here on add field created at.
    //userinfo function to get information of user such as username, ID, at what time created and so on
    function userinfoCommand(receivedMessage){
        const exampleEmbed = new Discord.MessageEmbed()
        .setTitle('User Info')
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


    //roll dice function to play this game. You will get two dice number. If want one remove second dice add field
    function rolldiceCommand(receivedMessage){
        
        var dice = [1, 2, 3, 4, 5, 6];
        let ExampleEmbed = new Discord.MessageEmbed()
            .setColor("#15f153")
            .addField("First dice", dice[Math.floor(Math.random()*dice.length)], true)
            .addField("Second dice", dice[Math.floor(Math.random()*dice.length)], true)
            .setTimestamp();

        receivedMessage.channel.send(ExampleEmbed);    
    }


    //uptime function to get time at from when server/bot is on
    function uptimeCommand(receivedMessage){
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

        receivedMessage.channel.send(Exampleembed);

    }


    //info function to get details regarding version, creator, invite link and so on
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


    //set bot status and change the icon near to name. from green dot to yellow half moon kind of
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


    //set afk and when set not afk bot welcomes the member 
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



    //multiply function . basic mathamatics
    function multiplyCommand(arguments, receivedMessage) {
        if (arguments.length < 2) {
            receivedMessage.channel.send("Not enough values to multiply. Try `/multiply 2 4 10` or `/multiply 5.2 7`")
            return
        }
        let product = 1 
        arguments.forEach((value) => {
            product = product * parseFloat(value)
        })
        receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
    }



    // function image to get particular image such as tav and koala
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


    // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html
    


    //Function returns the format
client.on('message', (message) => {


//tag user
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

//https://github.com/ShvetkumarPatel/cordbot