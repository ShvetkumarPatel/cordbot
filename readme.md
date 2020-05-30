
    "setbotstatus":{
        "name":"setbotstatus",
        "desc":"Set bot status",
        "usage":"/setbotstatus [status] you can choose the following strings: online, idle, invisible, dnd (do not disturb)",
        "example":"/setbotstatus online"
    },

    "help":{
        "name":"help",
        "group":"info",
        "desc":"Display the list of commands if you just type $help or if you type $help commandName display the current command info",
        "usage":"/help
        "example":"/help 
    },

    "info":{
        "name":"info",
        "group":"info",
        "desc":"Get bot info. Version, creator and invite link",
        "usage":"/info",
        "example":"/info"
    },

    "uptime":{
        "name":"uptime",
        "group":"info",
        "desc":"Get bot uptime",
        "usage":"$uptime",
        "example":"$uptime"
    },

    "userinfo":{
        "name":"userinfo",
        "group":"info",
        "desc":"Get your user info",
        "usage":"/userinfo",
        "example":"/userinfo"
    },

    "deletetrack":{
        "name":"deletetrack",
        "group":"music",
        "desc":"Delete a song from the queue, if you want know your current queue, just type $queue and you will get the songs",
        "usage":"$deletetrack [PositionNumberInQueue]",
        "example":"$deletetrack 2"
    },

    "joinchannel":{
        "name":"joinchannel",
        "group":"music",
        "desc":"Make the bot join in a voice channel, you must be in a voice channel",
        "usage":"$joinchannel",
        "example":"$joinchannel"
    },

    "nowplaying":{
        "name":"nowplaying",
        "group":"music",
        "desc":"Show the currently playing song",
        "usage":"$nowplaying",
        "example":"$nowplaying"
    },

    "pause":{
        "name":"pause",
        "group":"music",
        "desc":"Pause the currently playing song",
        "usage":"$pause",
        "example":"$pause"
    },

    "resume":{
        "name":"resume",
        "group":"music",
        "desc":"Resume the currently playing song",
        "usage":"$resume",
        "example":"$resume"
    },

    "playother":{
        "name":"playother",
        "group":"music",
        "desc":"Play a stream url",
        "usage":"$playother [StreamUrl]",
        "example":"$playother http://streaming.radionomy.com/A-RAP-FM-WEB"
    },

    "playtube":{
        "name":"playtube",
        "group":"music",
        "desc":"Play an youtube video, each time you use this command correctly, the youtube video will be added to the queue",
        "usage":"$playtube [youtubeUrl]",
        "example":"$playtube https://www.youtube.com/watch?v=BmxCR4_abd4"
    },

    "queue":{
        "name":"queue",
        "group":"music",
        "desc":"List the songs in queue",
        "usage":"$queue",
        "example":"$queue"
    },

    "skip":{
        "name":"skip",
        "group":"music",
        "desc":"Skip the current playing song",
        "usage":"$skip",
        "example":"$skip"
    },

    "stop":{
        "name":"stop",
        "group":"music",
        "desc":"The bot leaves the voice channel",
        "usage":"$stop",
        "example":"$stop"
    },

    "volume":{
        "name":"volume",
        "group":"music",
        "desc":"Set bot volume in the voice channel, you must type a number betweem 0-200",
        "usage":"$volume [Number]",
        "example":"$stop 100"
    },

    "ytsearch":{
        "name":"ytsearch",
        "group":"music",
        "desc":"Search for a song on youtube, then type a number betweem 1-20 (or less) from a list of 20 songs",
        "usage":"$ytsearch [SongName] then type a number",
        "example":"$ytsearch [His Name Is Pewdiepie] hit enter, then type a number"
    },

    "distance":{
        "name":"distance",
        "group":"randomstuff",
        "desc":"Get the distance between the sets of coordinates",
        "usage":"$distance [latitude1] [longitude1] [latitude2] [longitude2]",
        "example":"$distance 3.454545 45.233223 32.23232323 432.43534534"
    },

    "dogs":{
        "name":"dogs",
        "group":"randomstuff",
        "desc":"Find some cute dog pictures",
        "usage":"$dogs",
        "example":"$dogs"
    },

    "flipcoin":{
        "name":"flipcoin",
        "group":"randomstuff",
        "desc":"Flip a coin",
        "usage":"$flipcoin",
        "example":"$flipcoin"
    },

    "google":{
        "name":"google",
        "group":"randomstuff",
        "desc":"Get 3 search queries from Google Custom Search, you need to provide in the json file called googleConfig, your Custom Search Api Key and you CX",
        "usage":"$google [query]",
        "example":"$google dogs"
    },

    "ping":{
        "name":"ping",
        "group":"randomstuff",
        "desc":"Ping the bot",
        "usage":"$ping",
        "example":"$ping"
    },

    "randomcolor":{
        "name":"randomcolor",
        "group":"randomstuff",
        "desc":"Generates a random hex color with preview",
        "usage":"$randomcolor",
        "example":"$randomcolor"
    },

    "rolldice":{
        "name":"rolldice",
        "group":"randomstuff",
        "desc":"Roll a dice",
        "usage":"$rolldice",
        "example":"$rolldice"
    },

    "setafk":{
        "name":"setafk",
        "group":"randomstuff",
        "desc":"Set your status afk or notafk",
        "usage":"$setafk [status]",
        "example":"$setafk afk or $setafk notafk"
    },

    "weather":{
        "name":"weather",
        "group":"randomstuff",
        "desc":"Get the forecast information for a location",
        "usage":"$weather [location]",
        "example":"$weather Mosca"
    }
}
