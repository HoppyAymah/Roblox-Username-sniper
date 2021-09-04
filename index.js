var axios = require('axios');
var setTitle = require('console-title')
const CONFIG = require('./config.json')
var colors = require('colors')
let discord = require('discord.js')

let text = `

██╗░░██╗░█████╗░██████╗░██████╗░██╗░░░██╗██╗░██████╗  ░██████╗███╗░░██╗██╗██████╗░███████╗██████╗░
██║░░██║██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝╚█║██╔════╝  ██╔════╝████╗░██║██║██╔══██╗██╔════╝██╔══██╗
███████║██║░░██║██████╔╝██████╔╝░╚████╔╝░░╚╝╚█████╗░  ╚█████╗░██╔██╗██║██║██████╔╝█████╗░░██████╔╝
██╔══██║██║░░██║██╔═══╝░██╔═══╝░░░╚██╔╝░░░░░░╚═══██╗  ░╚═══██╗██║╚████║██║██╔═══╝░██╔══╝░░██╔══██╗
██║░░██║╚█████╔╝██║░░░░░██║░░░░░░░░██║░░░░░░██████╔╝  ██████╔╝██║░╚███║██║██║░░░░░███████╗██║░░██║
╚═╝░░╚═╝░╚════╝░╚═╝░░░░░╚═╝░░░░░░░░╚═╝░░░░░░╚═════╝░  ╚═════╝░╚═╝░░╚══╝╚═╝╚═╝░░░░░╚══════╝╚═╝░░╚═╝`


console.log(colors.blue(text))
console.log(colors.blue("================================================================================================="))

const webhookClient = new discord.WebhookClient(CONFIG.WebhookID, CONFIG.WebhookToken)

let totalValid = 0
let totalChecked = 0
setTitle("Hoppy's Username Sniper || v1.0 || Total Usernames Checked: "+totalChecked+" || Total Usernames Found: "+totalValid)


setInterval(() => {
  let currentUser = ''
  totalChecked++
  if(CONFIG.UseAi == false){
    var result  = []
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length

    for ( var i = 0; i < CONFIG.Length; i++ ) {
result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
   }

    CheckUser(result.join(''))

  }else{
    axios.get('http://names.drycodes.com/1?nameOptions=all&format=text')
  .then(function (response) {

    CheckUser(response.data)

  })
  }

function CheckUser(Username) {
axios.get('https://auth.roblox.com/v1/usernames/validate?request.username='+Username+'&request.birthday=1337-04-20')
  .then(function (response) {
    let message = response.data.message
           if(message == "Username is valid"){
console.log(colors.green(`[Valid] ${Username} is valid`))
totalValid++
let embed = new discord.MessageEmbed()
.setTitle(Username)
.setDescription(`${Username} is a Valid username`)
.setFooter('Made By HoppyAymah#0001')
.setTimestamp()
.setThumbnail('https://tr.rbxcdn.com/a3e6afce156e6f3dbb87d4c329915c12/150/150/AvatarHeadshot/Png')
.setColor('GREEN')

  webhookClient.send({
	username: "Hoppy's Username Finder",
	avatarURL: 'https://media.discordapp.net/attachments/815679497361686568/840346093245169674/5123a3073853d8107bcc14a2ef3c273b.png',
	embeds: [embed],
   })
           }else if(message == 'Username is already in use'){
console.log(colors.red(`[INVALID] ${Username} is already in use`))
           }else if(message == 'Username not appropriate for Roblox'){
console.log(colors.red(`[INVALID] ${Username} is not appropriate for Roblox`))
           }else{
console.log(colors.red(`[INVALID] ${Username} is invalid`))
           }
  })
}



setTitle("Hoppy's Username Sniper || v1.0 || Total Usernames Checked: "+totalChecked+" || Total Usernames Found: "+totalValid)
}, 5000)



  
