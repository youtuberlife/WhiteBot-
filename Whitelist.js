const discord = require("discord.js") // Not Important
const client = new discord.Client() // Not Important
const db = require("quick.db")
const axios = require('axios');
const Express = require("express");
const App = Express();
// ----- Data Base ----- \\
const DataBase = {
    Shoppy_AuthorizationID: "Shoppy Secret Key", // This is the ID used to connect to your shoppy to get Data, Change this to yours.
    Stored_WhitelistedUsers: "DataBase_Whitelisted", // Data for Whitelisted Users (DO NOT CHANGE THE NAME OF: Stored_WhitelistedUsers)
    Stored_UsedShoppyIDS: "DataBase_UsedIDS", // Data for Used Shoppy ID's (DO NOT CHANGE THE NAME OF: Stored_UsedShoppyIDS)
    Stored_ShoppyIDS: "DataBase_IDS", // Data to return shoppy ID's (DO NOT CHANGE THE NAME OF: Stored_ShoppyIDS)
}
// ----- Data Base ----- \\
if(!db.get(DataBase.Stored_UsedShoppyIDS)) {
    db.set(DataBase.Stored_UsedShoppyIDS, "")
} 
if(!db.get(DataBase.Stored_ShoppyIDS)) {
    db.set(DataBase.Stored_ShoppyIDS, "")
}
if(!db.get(DataBase.Stored_WhitelistedUsers)) {
    db.set(DataBase.Stored_WhitelistedUsers, "")
}
let responce;
// ^^^^^^^^^^^ checks if data base exist, If not then creates one.
App.get("/bot.js", (request, res) => { 
    let ThereKey =  request.query.key;
    if(!ThereKey) {
        return "Key Not Supplied";
    }
    let ShoppyIDS = db.get(DataBase.Stored_ShoppyIDS)
    let one = ShoppyIDS
    if (one.indexOf(ThereKey) == -1) {
        res.send("Not Whitelisted")
        return "Not Whitelisted";
    }
    else
    {
    res.send("Whitelisted!")
    return "Whitelisted!";
    }
})
App.get("/script.lua", (request, res) => { 
  let scrpt = [[]]
})
client.on("message", message => {
const args = message.content.slice("?".length).trim().split(/ +/g); // Not Important
const content = args.shift().toLowerCase(); // Not Important
if (content === "redeem") { // Command they use to whitelist
    if(!message.guild) { // Checking If the command is ran in the Bot DM'S
        const key = args[0]
        if(!key)return(message.reply("Please Include your Shoppy Purchase ID!")) // Checks If they Included there Shoppy ID
        // ----- script ----- \\
        axios.get("https://shoppy.gg/api/v1/orders/"+key, {
            headers: {
              Authorization: DataBase.Shoppy_AuthorizationID, // Needed to log data.
            }
          }).then(function (response) { 
           let data = response.data
           console.log(data["id"])
          message.reply(data["custom_fields"]["value"])
          const responce = response
           let UsedShoppyIDS = db.get(DataBase.Stored_UsedShoppyIDS) 
           let ShoppyIDS = db.get(DataBase.Stored_ShoppyIDS)
           let WhitelistedUsers = db.get(DataBase.Stored_WhitelistedUsers)
           let one = UsedShoppyIDS
           let two = ShoppyIDS
           let three = WhitelistedUsers
           if (!WhitelistedUsers.indexOf(message.author.id) == -1) {
            message.reply("You are already Whitelisted, you cannot whitelist again!") // prevents member from re-whitelisting
            return;
           }
           // -------------------------------------------- \\
           if (!one.indexOf(key) == -1) { // Checks If the key is already Used!
           if (data["confirmations"] === 1) { // Checks If they completed a Purchase
               db.push(DataBase.WhitelistedUsers, message.author.id)
               db.push(DataBase.UsedShoppyIDS, key)
               db.push(DataBase.Stored_ShoppyIDS, key)
               message.reply("You Have successfully Whitelisted! Your Key is your shoppy id. Please use this script:")
               message.reply("_G.Key = '"+key+"'\nloadstring(game:HttpGet('https://rhs-bot.glitch.me/script.lua))()")
               client.guild("770684436610154507").
               return;
           }
           else
           {
               message.reply("Please go back and Complete your purchase before using that Shoppy ID")
           }
           }
           else
           {
               message.reply("The Shoppy ID was already used to Whitelist a User!");
               return;
           } // DONT TOUCH BELOW!
          }).catch(err => {
            console.log(err)
            console.log(err.message)
            if(err.response === "404") {
             message.reply("**Invalid ID entered!** (Wrong shoppy ID)")
            return;
          }
          message.reply("**Invalid ID entered!** (Wrong shoppy ID)")
          })
        // ----- script ----- \\
    }
    else
    {
     message.delete();
     message.reply("Please use this command in my DMS!")
    }
}
})
console.log("ready!")
client.login("DISCORD BOT TOKEN")
