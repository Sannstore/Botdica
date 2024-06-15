
require('./config')
const {downloadContentFromMessage, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
// new module
const axios = require('axios');
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const { sizeFormatter } = require('human-readable');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const moment = require('moment-timezone');
const crypto = require("crypto");
const archiver = require('archiver');
const qrcode = require('qrcode')
const cron = require('node-cron');
//code
let signup = JSON.parse(fs.readFileSync('./src/user.json'))
let ban = JSON.parse(fs.readFileSync('./src/banned.json'))
let isBanned = JSON.parse(fs.readFileSync('./src/banned.json'))
let db_respon_list = JSON.parse(fs.readFileSync('./src/db_list.json'))
let sewa = JSON.parse(fs.readFileSync('./src/sewa.json'));
let uvvip = JSON.parse(fs.readFileSync('./src/role/vvip.json'));
let uvip = JSON.parse(fs.readFileSync('./src/role/vip.json', 'utf8'));
let uprem = JSON.parse(fs.readFileSync('./src/role/premium.json'));
let upatner = JSON.parse(fs.readFileSync('./src/role/patner.json'));
let limit = JSON.parse(fs.readFileSync('./src/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./src/glimit.json'));
let set_bot = JSON.parse(fs.readFileSync('./src/set_bot.json'));

const {
       isAlreadyResponList, 
       sendResponList, 
       getDataResponList
 } = require('../src/function_list')
const calc = require("../lib/calcml")
const toRupiah = require('../lib/toRupiah')
const {
  smsg,
  fetchJson,
  getBuffer,
  getGroupAdmins,
  TelegraPh,
  msToDate,
  isUrl,
  hitungmundur,
  checkBandwidth,
  runtime,
  getRandom,
  sleep
} = require('../lib/simple')
const { 
isLimit, 
limitAdd, 
getLimit, 
 } = require("../lib/limit");
 const { getTextSetBot } = require('../lib/setbot');
const _prem = require("../lib/premium")
const _sewa = require("../lib/sewa");
const { 
UploadFileUgu, 
webp2mp4File, 
 } = require('./uploader');
const { resolve } = require('path');
const path = require('path/win32');
require('./menu')
// is function
const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})


const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}

module.exports = vler = async (dica, m, chatUpdate, store, set_open, set_close, antilink, antiwame, antilink2, antiwame2, simisimi, _left, _welcome, set_welcome_db, set_left_db) => {
  try {
    var body =
    m.mtype === "conversation"
    ? m.message.conversation
    : m.mtype == "imageMessage"
    ? m.message.imageMessage.caption
    : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
  
        var budy = (typeof m.text == 'string' ? m.text : '')
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    var prefix2 = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "";
    const isCmd2 = body.startsWith(prefix);
    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await dica.decodeJid(dica.user.id);
    const itsMeDica = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isBanned = ban.includes(m.sender)    
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const fatkuns = (m.quoted || m)
    const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    const tanggal = moment().tz("Asia/Jakarta").format("ll")
    const tanggal2 = moment().tz("Asia/Jakarta").locale("id").format('DD/MM/YYYY')
    const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
    const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
    const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
	if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang️'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Selamat Pagi'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat Malam'
}
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	var date = new Date();
	var thisDay = date.getDay(),
    thisDay = myDays[thisDay];  
    const today = new Date();
    today.setDate(today.getDate() + 30); 
    const tanggall = today.toLocaleDateString("ID", { timeZone: "Asia/Jakarta" });
    
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];  
    const limitCount = limite.limitCount
	const type = getContentType(m.message)
    const quotedType = getContentType(m.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    if (type == 'ephemeralMessage') {
        m.message = m.message.ephemeralMessage.message
        m.message = m.message.ephemeralMessage.message.viewOnceMessage
    }
    if (type == 'viewOnceMessage') {
        m.message = m.message.viewOnceMessage.message
    }

    const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
    const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
    mention != undefined ? mention.push(mentionByReply) : []
    const mentionUser = mention != undefined ? mention.filter(n => n) : []
    let mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
      
    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'

    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'
    const isAntiLink = antilink.includes(m.chat) ? true : false
    const isSimi = simisimi.includes(m.chat) ? true : false
    const isAntiWame = antiwame.includes(m.chat) ? true : false
    const isAntiLink2 = antilink2.includes(m.chat) ? true : false
    const isAntiWame2 = antiwame2.includes(m.chat) ? true : false
    const isWelcome = _welcome.includes(m.chat) ? true : false
    const isLeft = _left.includes(m.chat) ? true : false
    const isSewa = _sewa.checkSewaGroup(from, sewa) ? true : false
const Input = mentionUser[0] ? mentionUser[0] : Number(args[0]) + '@s.whatsapp.net';
    

async function getGcName(groupID) {
    try {
        let data_name = await dica.groupMetadata(groupID);
        return data_name.subject;
    } catch (err) {
        return '*Group Tidak Ada*';
    }
}

if (m.message) {
    try {
        await dica.readMessages([m.key]); 
        const jakartaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const groupName = m.isGroup ? await getGcName(m.chat) : m.chat.split('@')[0]; 
        console.log(
            chalk.black(chalk.bgWhite('[ CMD ]')),
            chalk.black(chalk.bgGreen(jakartaTime)),
            chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' +
            chalk.magenta('=> From'), chalk.green(pushname),
            chalk.yellow(sender.split('@')[0]) + '\n' +
            chalk.blueBright('=> In'), chalk.green(m.isGroup ? 'Groups ' + groupName : 'Chat Pribadi ' + groupName)
        );
    } catch (error) {
        console.error(chalk.red('Error:', error));
    }
}

function createZipArchive() {
  const output = fs.createWriteStream('backup.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Berhasil mengompres ${archive.pointer()} total byte`);
   dica.sendFile(`${global.ownerr}@s.whatsapp.net`, 'backup.zip', 'backup', `Backup: ${tanggal}`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  const foldersToArchive = ['src', 'db', 'session', 'setting', 'lib', 'image'];

  foldersToArchive.forEach((folder) => {
    archive.directory(folder, folder);
  });

  archive.finalize();
}

    async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(m.message.videoMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(m.message.stickerMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(m.message.audioMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        function mentions(teks, mems = [], id) {
          if (id == null || id == undefined || id == false) {
          let res = dica.sendMessage(from, { text: teks, mentions: mems })
          return res } else { let res = dica.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
          return res}}
          
    
    // Group
    const groupMetadata = m.isGroup ? await dica.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isGroup = m.isGroup
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = signup.includes(sender)
    
//━━━━━━━━━━━━━━━[ ANTILINK ]━━━━━━━━━━━━━━━━━//
const konf = userme === 'kosong' && production === 'kosong'
        if (isGroup && isAntiLink){
            if (chath.includes(`https://chat.whatsapp.com`)) {
              if (!isBotAdmins) return reply(`Upsss... gajadi, bot bukan admin`)
              let gclink = (`https://chat.whatsapp.com/` + await dica.groupInviteCode(m.chat))
              let isLinkThisGc = new RegExp(gclink, 'i')
              let isgclink = isLinkThisGc.test(m.text)
              if (isgclink) return reply(`Upsss... gak jadi, untung link gc sendiri`)
              if (isAdmins) return reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
              if (itsMeDica) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              if (m.key.fromMe) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
                await dica.sendMessage(from, { delete: m.key })
                reply(`🛡 *GROUP LINK DETECTOR* 🛡\n\nBudayakan baca Deskribsi mas, mari saling menghargai`)
                
                let number = sender
      await dica.groupParticipantsUpdate(from, [number], "remove")
            }
        }    
        if (isAntiLink2) {
          if (budy.match(`chat.whatsapp.com`)) {
              if (!isBotAdmins) return //reply(`Upsss... gajadi, bot bukan admin`)
              let gclink = (`https://chat.whatsapp.com/` + await dica.groupInviteCode(m.chat))
              let isLinkThisGc = new RegExp(gclink, 'i')
              let isgclink = isLinkThisGc.test(m.text)
              if (isgclink) return //reply(`Upsss... gak jadi, untung link gc sendiri`)
              if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
              if (itsMeDica) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
          }
      }
      if (isAntiWame) {
          if (budy.match(`wa.me/`)) {
              reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`)
              if (!isBotAdmins) return reply(`Upsss... gajadi, bot bukan admin`)
          
              if (m.key.fromMe) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
              dica.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
          }
      }
      if (isAntiWame2) {
          if (budy.match(`wa.me/`)) {
              if (!isBotAdmins) return //reply(`Upsss... gajadi, bot bukan admin`)
              if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
              if (itsMeDica) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
              await dica.sendMessage(m.chat, {
                  delete: {
                      remoteJid: m.chat,

                      fromMe: false,
                      id: m.key.id,
                      participant: m.key.participant
                  }
              })
          }
      }
      
    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;
    if ((budy) && ["bot", "Bot", "Bit"].includes(budy) && !isCmd2) {
if (!isGroup) return 
const getTextBot = getTextSetBot(from, set_bot);
if (getTextBot !== undefined) {
dica.sendMessage(from, { text: getTextBot })
} else {
dica.sendMessage(from, { text: `Bot sudah aktif🌹` })
}
}
if (budy.toLowerCase() === 'p') {
if (!isAdmins || !m.quoted || !isGroup) return
  let proses = `O━• Transaksi Pending •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${m.quoted.text}\n\nPesanan @${m.quoted.sender.split("@")[0]} sedang di proses!\n\n━O━O━••••••••••••━O━O━`
  mentions(proses, [m.quoted.sender], true)
} 
if (budy.toLowerCase() === 'd'){
if (!isAdmins || !m.quoted || !isGroup) return
let sukses = `O━• Transaksi Sukses •━O\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih atas orderannya @${m.quoted.sender.split("@")[0]}🙏\n\n━O━O━••••••••••••━O━O━`
mentions(sukses, [m.quoted.sender], true)
}
    // Jika ada user
    if (isCmd2 && !isUser) {
      signup.push(sender)
      fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 2))
    }
  


if (!isCmd2 && m.isGroup && isAlreadyResponList(from, budy, db_respon_list)) {
  const budyLower = budy;

  var get_data_respon = getDataResponList(from, budyLower, db_respon_list);

  if (get_data_respon.isImage === false) {
      dica.sendMessage(from, { text: sendResponList(from, budyLower, db_respon_list) }, {
          quoted: m
      });
  } else {
      dica.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
          quoted: m
      });
  }
}

//cornsjob role
   

//batas cornsjob role
const level = {
  itsMeDica
}

//✄┈┈┈⟬ *FITUR RATE BAHAN* ⟭ •
require('../command/caseRateBahan')(command, reply, m, text, itsMeDica, isAdmins)
//✄┈┈┈⟬ *FITUR STALK* ⟭ •
require('../command/caseStalkUsername')(command, reply, m, text, level)
//✄┈┈┈⟬ *FITUR OWNER* ⟭ •
require('../command/caseOwner')(prefix, command, reply, text, level, sleep, dica, m, from, isUrl, args, signup, mentions, Input, sewa, getGcName, _sewa, isSewa)
//✄┈┈┈⟬ *FITUR PREMIUM* ⟭ •
require('../command/casePremium')(command, dica, reply, m, sender, prefix, itsMeDica, args, isImage, isQuotedImage, quoted, text, isQuotedSticker, calc, pushname, from )
//✄┈┈┈⟬ *FITUR GROUP* ⟭ •
require('../command/caseGroup')(prefix, command, m, from, sender, text, dica, pushname, groupMetadata, participants, isBotAdmins, isAdmins, itsMeDica, reply, args, store, botNumber, db_respon_list, isImage, isQuotedImage, groupName, tanggal, time2, Input, mentions, mentionUser, sleep, quoted, _welcome, _left, isWelcome, isLeft, isAntiLink, antilink, isAntiLink2, antilink2, set_welcome_db, set_left_db, antiwame, isAntiWame, isAntiWame2, antiwame2, set_open, set_close, set_bot, isSewa, _sewa, sewa )
    switch (command) {
      //━━━━━━━━━━━━━━━[ CASE NYA ]━━━━━━━━━━━━━━━━━//      

        case 'owner':
          case 'creator': {
              dica.sendContact(m.chat, global.owner, m)
          }
          break

          case 'ping': case 'botstatus': case 'statusbot': {
            if (!itsMeDica) throw mess.owner
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0
            }
            })
            let timestamp = speed()
            let latensi = speed() - timestamp
            neww = performance.now()
            oldd = performance.now()
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
            `.trim()
            m.reply(respon)
        }
        break;
        
       
            
//✄┈┈┈⟬ *DOWNLOADER* ⟭ •
            case 'igdl': {
            	if (isBanned) return m.reply(`*You Have Been Banned*`)
        if (!args[0]) return reply(`Kirim perintah:\n${prefix+command} link Instagram video/reels\n\nContoh penggunaan:\n${prefix+command} https://www.instagram.com/reel/Clclas0jHHD/?igshid=MzRlODBiNWFlZA==`);
if (!isUrl(args[0])) return reply(`Kirim perintah:\n${prefix+command} link Instagram video/reels\n\nContoh penggunaan:\n${prefix+command} https://www.instagram.com/reel/Clclas0jHHD/?igshid=MzRlODBiNWFlZA==`);
reply(mess.wait);

axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=${global.lolkey}&url=${encodeURIComponent(instagramURL)}`)
  .then(response => {
    const result = response.data.result;
    const videoURL = result[0];
    const imageURL = result[1];

    let buttonMessage = {
      video: {
        url: videoURL
      },
      caption: "NIH HASILNYA!\n" + text,
    };

    dica.sendMessage(from, buttonMessage, { quoted: m });
  })
  .catch(error => {
    console.log(error);
    reply("Terjadi kesalahan saat mengambil hasil dari link Instagram tersebut.");
  });
  
            }
            break
case 'ttdl':{
	if (isBanned) return m.reply(`*You Have Been Banned*`)
	if (!text) return reply('Link nya mana?')
const apiUrl = `https://api.lolhuman.xyz/api/tiktok?apikey=${global.lolkey}&url=${encodeURIComponent(args[0])}`;
reply(mess.wait)
axios.get(apiUrl)
  .then((response) => {
    if (response.status === 200) {
      const data = response.data;
     const NIH =  `*Judul:* ${data.result.title}
*Durasi:* ${data.result.duration} detik
*Penulis:* ${data.result.author.username}
*Putar:* ${data.result.statistic.play_count}
*Suka:* ${data.result.statistic.like_count}
*Bagikan:* ${data.result.statistic.share_count}
*Komentar:* ${data.result.statistic.comment_count}`

let buttonMessage = {
      video: {
        url: data.result.link
      },
      caption: NIH,
    };
    dica.sendMessage(from, buttonMessage, { quoted: m });
    } else {
      reply(`Gagal mengambil data:\n ${response.status}, \n${response.statusText}`);
    }
  })
  .catch((error) => {
    console.error('Terjadi kesalahan:', error);
    reply(`*Terjadi kesalahan:* Video tidak di temukan `);
  });
	}
	break
case 'ttvn': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} + url`
const apiUrl = `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${global.lolkey}&url=${encodeURIComponent(args[0])}`;
axios.get(apiUrl)
  .then((response) => {
    if (response.status === 200) {
      const data = response.data;
      if (data.result) {
        const musicUrl = data.result;
        dica.sendMessage(m.chat, {audio: { url: `${musicUrl}` }, mimetype: 'audio/mpeg', ptt: true}, { quoted : m })
      } else {
        reply('Musik TikTok tidak ditemukan.');
      }
    } else {
      console.log('Gagal mengambil data:', response.status, response.statusText);
      reply('Gagal mengambil data:')
    }
  })
  .catch((error) => {
    console.error('Terjadi kesalahan:', error);
  });
     }
    break;
case 'ttmp3': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} + url`
const apiUrl = `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${global.lolkey}&url=${encodeURIComponent(args[0])}`;
reply(mess.wait)
axios.get(apiUrl)
  .then((response) => {
    if (response.status === 200) {
      const data = response.data;
      if (data.result) {
        const musicUrl = data.result;
        dica.sendMessage(m.chat, {audio: { url: `${musicUrl}` }, mimetype: 'audio/mpeg'}, { quoted : m })
      } else {
        reply('Musik TikTok tidak ditemukan.');
      }
    } else {
      console.log('Gagal mengambil data:', response.status, response.statusText);
      reply('Gagal mengambil data:')
    }
  })
  .catch((error) => {
    console.error('Terjadi kesalahan:', error);
  });
     }
    break;
    
    case 'ytdl': case 'ytmp4': {
  if (isBanned) return m.reply(`*You Have Been Banned*`)
  if (!text) throw `Example : ${prefix + command} + url`
  const apiUrl = `https://api.lolhuman.xyz/api/ytvideo2?apikey=${global.lolkey}&url=${encodeURIComponent(text)}`;
  reply(mess.wait)
  axios.get(apiUrl)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        if (data.result) {
          const videoInfo = data.result;
          const teks = `*Judul Video:* ${videoInfo.title}

_*Mohon bersabar Video sedang di kirim*_`
reply(teks)
          if (videoInfo.link) {
            let buttonMessage = {
              video: {
                url: videoInfo.link
              },
              caption: 'Done',
            };
            dica.sendMessage(from, buttonMessage, { quoted: m });
          } else {
            reply('Tidak ada tautan video.');
          }
        } else {
          reply('Video YouTube tidak ditemukan.');
        }
      } else {
        console.log('Gagal mengambil data:', response.status, response.statusText);
        reply('Gagal mengambil data:')
      }
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
}
break;
case 'ytmp3': {
  if (isBanned) return reply('*You Have Been Banned*');
  if (!text) throw `Example : ${prefix + command} + url`;
  if (!isUrl(text)) return reply('text harus berupa url')
  const apiUrl = `https://api.lolhuman.xyz/api/ytaudio2?apikey=${global.lolkey}&url=${encodeURIComponent(text)}`;
  reply(mess.wait);
  axios.get(apiUrl)
      .then((response) => {
          if (response.status === 200) {
              const data = response.data;
              if (data.result) {
                  const audioInfo = data.result;
                  dica.sendMessage(m.chat, { audio: { url: `${audioInfo.link}` }, mimetype: 'audio/mpeg' }, { quoted: m });
              } else {
                  reply('Audio YouTube tidak ditemukan.');
              }
          } else {
              console.log('Gagal mengambil data:', response.status, response.statusText);
              reply('Gagal mengambil data');
          }
      })
      .catch((error) => {
          console.error('Terjadi kesalahan:', error);
          reply('Terjadi kesalahan saat memproses permintaan.');
      });
}
break;

    
//✄┈┈┈⟬ *CONVERT* ⟭ • 
case 'sticker': case 's': case 'stickergif': 
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        {
          if (/image/.test(mime)) {
          m.reply(mess.wait)
               let media = await dica.downloadMediaMessage(qmsg)
               let encmedia = await dica.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else if (/video/.test(mime)) {
           m.reply(mess.wait)
               if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
               let media = await dica.downloadMediaMessage(qmsg)
               let encmedia = await dica.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else {
               m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
               }
           }
           break;
           case 'ttp':
        if (isBanned) return m.reply(`*You Have Been Banned*`)
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} lucu abis`)
            if (q.length > 75) return reply(`Teksnya terlalu panjang`)
            
            //var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var data = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=${global.lolkey}&text=${encodeURIComponent(q)}`)
            var rand2 = 'image/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./image/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                dica.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: m })
                fs.unlinkSync(`./${rand2}`)
            })
            break
        case 'attp':
        if (isBanned) return m.reply(`*You Have Been Banned*`)
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\nContoh : ${command} lucu abiss`)
            if (q.length > 75) return reply(`Teksnya terlalu panjang`)
            
            //var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var data = await getBuffer(`https://api.lolhuman.xyz/api/attp?apikey=${global.lolkey}&text=${encodeURIComponent(q)}`)
            var rand2 = 'image/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./image/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                dica.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: m })
                fs.unlinkSync(`./${rand2}`)
            })
            break
           case 'tourl': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let media = await dica.downloadAndSaveMediaMessage(qmsg)
        if (/image/.test(mime)) {
            let anu = await TelegraPh(media)
            m.reply(util.format(anu))
        } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media)
            m.reply(util.format(anu))
        }
        await fs.
        unlinkSync(media)
    }
    break;
    case 'toaudio': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} Hallo semua`
      m.reply(mess.wait)
        dica.sendMessage(m.chat, {audio: { url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${text}` }, mimetype: 'audio/mpeg'}, { quoted : m })

    }
    break;
case 'tomp3':
            if (isVideo || isQuotedVideo) {
                let media = await downloadAndSaveMediaMessage('video', `./image/${sender}.mp4`)
                reply(mess.wait)
                
                let ran = './image/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    if (err) return reply('Gagal :V')
                    dica.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3` }, { quoted: m })
                    fs.unlinkSync(ran)
                })
            } else {
                reply(`Kirim/reply video dengan caption ${command}`)
            }
            break
case 'toimg': case 'toimage': case 'tovid': case 'tovideo':
if (isBanned) return m.reply(`*You Have Been Banned*`)
            if (!isQuotedSticker) return reply(`Reply stikernya!`)
            var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'image/'+getRandom('.webp')
            var rand2 = 'image/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return reply('Error')
                    dica.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: m })
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                reply(mess.wait)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    dica.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: m })
                })
            }
            break



//✄┈┈┈⟬ *STORE MENU* ⟭ •
case 'tambah': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  if (!Number(args[0])) return
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one + nilai_two}*`);
}
break;
case 'kurang': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  if (!Number(args[0])) return
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one - nilai_two}*`);
}
break;
case 'kali': {
  if (!q) {
    return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
  if (!Number(args[0])) return
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one * nilai_two}*`);
}
break;
case 'bagi': {
  if (!q) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`);
  }
	if (!Number(args[0])) return
  var num_one = text.split(' ')[0];
  var num_two = text.split(' ')[1];
  if (!num_one) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  if (!num_two) {
    return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`);
  }
  var nilai_one = Number(num_one);
  var nilai_two = Number(num_two);
  reply(`Hasilnya adalah *${nilai_one / nilai_two}*`);
}
break;

  //✄┈┈┈⟬ *OWNER MENU* ⟭ •
   
    
	//━━━━━━━━━━━━━━━[ MAIN MENU ]━━━━━━━━━━━━━━━━━//              
  
      case 'simi': case 'kilaa': case 'kila':{
if (!text) return reply(`Apa?`)
  
  limitAdd(m.sender, limit)
  const modifiedText = text.replace(/simi/gi, 'kilaa')
  fetch(`https://api.lolhuman.xyz/api/simi?apikey=${global.lolkey}&text=${encodeURIComponent(modifiedText)}&badword=true`)
    .then(res => res.json())
    .then(data => {
      const result = data.result
      const modifiedResult = result.replace(/simi/gi, 'kilaa')
      reply(modifiedResult)
    })
    .catch(err => {
      console.error(err)
      reply(`Terjadi kesalahan saat meminta respon simi. Silakan coba lagi nanti.`)
    })
  }
  break
  case 'sewa': case 'sewabot':
                   var teks = `Jika kamu ingin memasukkan Bot ke dalam Grup, kamu cukup membayar Rp5.000 untuk 1 Minggu, Rp10.000 untuk 1 Bulan. Untuk Sewa tidak ada yang Permanent. Jika berminat silahkan chat Owner Bot, ketik ${prefix}owner\n\nPembayaran bisa melalui Gopay/Pulsa/Dana`
                   reply(teks)
                   break
case 'rules': 
reply('Gaada 😋')
break;
case 'runtime':
let respon_nya = `Runtime : 8bulan, ${runtime(process.uptime())}`
reply(respon_nya)
break 
  //━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//      
  case "help" : {
	let anu = `Fitur ${command} tidak tersedia. Mungkin maksud Anda ${prefix}menu`
reply(anu);          
}              
break;              

case "req": {
  reply('_Request Anda telah diteruskan ke owner. Terima kasih atas Sarannya!_')
  const teks = `Ada Permintaan Request nih kak Dari ${pushname}
  
  ${text}`
  dica.sendMessage(ownerr+"@s.whatsapp.net",{text: `${teks}`}, {quoted: m})
}
break;
 

  case "ownermenu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mowner)
  }
  break        
  case "convert": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.convert)
  }
  break        
  case "downloader": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mdownl)
  }
  break        
  case "menugroup": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mgroup)
  }
  break        
  case "menupremium": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mprem)
  }
  break        
  case "menustalk": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mstalk)
  }
  break        
  case "calcml": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mcalc)
  }
  break        
  case "rate": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mrate)
  }
  break        
  case "storemenu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mstore)
  }
  break        
case "mainmenu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mmain)
  }
  break        
  case "leaderboard": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.leader)
  }
  break
  case "allmenu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  reply(global.mfun)
  }
  break
case "menu": {
  if (isBanned) return m.reply(`*You Have Been Banned*`);
  const menuText = `*${ucapanWaktu} Kak ${pushname ? pushname : "Anon"}.*
Berikut adalah daftar menu yang tersedia.


===============================
*DETAIL INFORMASI AKUN*

*Nama :* ${m.pushName} 
*Level :* ${itsMeDica ? 'Dev': 'User'}
*UID     :* ${sender.replace("@s.whatsapp.net", "")}
===============================
${global.msimple}


_*${packname} ${Corporat}`;

dica.sendText(m.chat, menuText, m);
}
break;
 
case 'sendsesi':{
createZipArchive();
}
break

// END
              
}
} catch (err) {
m.reply(util.format(err));
}
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
