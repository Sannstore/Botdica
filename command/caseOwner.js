const fs = require('fs')
const chalk = require('chalk')
const ms = require('parse-ms')
const toRupiah = require('../lib/toRupiah')
const { exec } = require("child_process");
require('../setting/config')
async function FiturOwner(prefix, command, reply, text, level, sleep, dica, m, from, isUrl, args, signup, mentions, Input, sewa, getGcName, _sewa, isSewa) {
    const itsMeDica = level.itsMeDica;
    switch(command){
      case 'delsewa':
        if (!itsMeDica) return reply(mess.owner)
        if (!m.isGroup) return reply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
        if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)
        sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
        fs.writeFileSync('./src/sewa.json', JSON.stringify(sewa, null, 2))
        reply(`Sukses`)
        break
      case 'addsewa':{
        if (!itsMeDica) return reply(mess.owner)
        if (!text) return reply(`Gunakan dengan cara ${prefix+command} *linkgc waktu*\n\n*LIST WAKTU*\nd = days\nh = hours\nm = minutes\n\n*TRANSLATE*\ndays > hari\nhours > jam\nminutes > menit`)
        let ini_linknyaa = text.split(' ')[0] ? text.split(' ')[0] : text
        let ini_waktunya = text.split(' ')[1] ? text.split(' ')[1] : ''
        if (ini_waktunya.length <1) return reply(`harus di isi semua!!\n_contoh_\n${prefix+command} *linkgc waktu*\n\n*LIST WAKTU*\nd = days\nh = hours\nm = minutes\n\n*TRANSLATE*\ndays > hari\nhours > jam\nminutes > menit`)
        if (!isUrl(args[1])) return reply('Link tidak valid')
        var ini_urrrl = ini_linknyaa.split('https://chat.whatsapp.com/')[1]
        var data = await dica.groupAcceptInvite(ini_urrrl)
        if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
        _sewa.addSewaGroup(data, ini_waktunya, sewa)
        reply(`Success Add Sewa Group Berwaktu!`)
        }
        break
      case 'listsewa':
if (!itsMeDica) return reply(mess.owner)
            let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
                if (x.expired === 'PERMANENT') {
                    let ceksewa = 'PERMANENT'
                    list_sewa_list += `*Expire :* PERMANENT\n\n`
                } else {
                    let ceksewa = ms(x.expired - Date.now())
                    list_sewa_list += `*Expire :* ${ceksewa.days} hari, ${ceksewa.hours} jam ${ceksewa.minutes} menit ${ceksewa.seconds} detik\n\n`
                }
            }
            dica.sendMessage(from, { text: list_sewa_list }, { quoted: m })
            break
      case 'bc': case 'broadcast': {
        if (!itsMeDica) return reply(`Command ${command} Hanya Khusus Owner`)
        if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
        let getJidGroup = await dica.groupFetchAllParticipating()
        let jidGroup = Object.entries(getJidGroup).slice(0).map(entry => entry[1])
        let jidGrup = jidGroup.map(v => v.id)
        let teks = `${text}`
        reply(`*Otw Mengirim*`)
        for (let i of jidGrup) {
        let gcMetadata = await dica.groupMetadata(i)
        let partcipant = await gcMetadata.participants
        await sleep(3000)
        dica.sendMessage(i, {text:`「 ${global.packname} Broadcast」\n\n` + teks })
        }
        reply(`Sukses Mengirim Broadcast Ke ${jidGrup.length} Group`)
        }
        break
        case 'delboard': { 
            if (!itsMeDica) return reply(mess.owner);
          
            try {
              const idYangInginDiHapus = Number(text) + "@s.whatsapp.net";
              const index = balanceDB.findIndex(item => item.id === idYangInginDiHapus);
              if (index !== -1) {
                balanceDB.splice(index, 1);
          
                
                const updatedData = JSON.stringify(balanceDB, null, 2);
                fs.writeFileSync('./src/balance.json', updatedData, 'utf8');
                reply(`Nomer ${idYangInginDiHapus.split('@')[0]} berhasil dihapus.`);
              } else {
                reply(`Nomer ${idYangInginDiHapus.split('@')[0]} tidak ditemukan.`);
              }
            } catch (err) {
              reply('Terjadi kesalahan:', err);
            }
            }
            break;
                        case 'resetboard': {
            if (!itsMeDica) return reply(mess.owner);
            try {
              for (const balance of balanceDB) {
                balance.total_lessblnc = 0;
                balance.total_addblnc = 0;
              }
              const updatedData = JSON.stringify(balanceDB, null, 2);
              fs.writeFileSync('./src/balance.json', updatedData, 'utf8');
              
              reply('Perubahan berhasil disimpan.');
            } catch (err) {
              reply('Terjadi kesalahan:', err);
            }
            }
            break;
     
        case 'ban':
            if (!text) return reply(`Example : ${prefix + command} 62xxxxxxxxxxx`)
                if (!itsMeDica) return reply(mess.owner)
                bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
            ban.push(bnnd)
                fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
                m.reply(`${bnnd}`)
            break;
            case 'unban':
            if (!text) return reply(`Example : ${prefix + command} 62xxxxxxxxxxx`)
                if (!itsMeDica) return reply(mess.owner)
                bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
            unp = ban.indexOf(bnnd)
            ban.splice(unp, 1)
                fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
                m.reply(`${bnnd}`)
            break;
            case 'listban': case 'lisbanned':
              if (!itsMeDica) return reply(mess.owner)
              teks = '*List Banned*\n\n'
              for (let medog of ban) {
                teks += `- ${medog}\n`
              }
              teks += `\n*Total Banned : ${ban.length}*`
              dica.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } })
            break;
        case 'getip': {
            if (!itsMeDica) return reply(mess.owner)
                reply("My public IP address is: " + ipserver);
              }
          break;
        case "listuser" :
            if (!itsMeDica) return reply(mess.owner)
            teks = '*_List User :)_*\n\n'
            for (let pengguna of signup) {
              teks += `- ${pengguna.split('@')[0]}\n`
            }
            teks += `\n*_Total User : ${signup.length}_*`
            dica.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": signup } })
          break;              
          
        case 'join': {
            if (!itsMeDica) return reply(mess.owner)
            if (!text) return reply('Masukkan Link Group!')
            if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
            reply(mess.wait)
            let result = args[0].split('https://chat.whatsapp.com/')[1]
            await dica.groupAcceptInvite(result).then((res) => m.reply("Done")).catch((err) => m.reply(jsonformat(err)))
        }
        break;
        case 'block': {
          if (!itsMeDica) return reply(mess.owner)
          let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
          await dica.updateBlockStatus(users, 'block').then((res) => m.reply("Done")).catch((err) => m.reply(jsonformat(err)))
      }
        break;
        case 'unblock': {
              if (!itsMeDica) return reply(mess.owner)
              let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
              await dica.updateBlockStatus(users, 'unblock').then((res) => m.reply("Done")).catch((err) => m.reply(jsonformat(err)))
          }
          break;
        case 'restart': {
            if (!itsMeDica) return reply(mess.owner)
            await reply(`_Restarting ${packname}_`)
            try{
              await dica.sendMessage(from, {text: "*_Succes_*"})
              await sleep(3000)
              exec(`npm start`)
            } catch (err) {
              exec(`node index.js`)
              await sleep(4000)
              reply('*_Sukses_*')
            }
          }
            break;
        case 'them': {
            if (!itsMeDica) return;
          const p = text.split(' ');
          const data = JSON.parse(fs.readFileSync("./src/validasi.json"));
          
          if (p[0] === '1' || p[0] === '2' || p[0] === '3' || p[0] === '4' || p[0] === '5') {
           
            if (isNaN(p[0])) {
              return reply('Harap masukkan nomer yang valid.');
            }
            data.menu = Number(p[0])
            fs.writeFileSync("./src/validasi.json", JSON.stringify(data, null, 2));
            reply(`Thema tipe ${q} berhasil diupdate.`);
          } else {
            reply('Tipe pengguna tidak valid. Gunakan salah satu dari "1", "2", "3", "4", atau "5".\n\nContoh Penggunaan\n.them 1');
          }
          }
          break;
          case 'plate': {
            if (!itsMeDica) return;
          const p = text.split(' ');
          const data = JSON.parse(fs.readFileSync("./src/validasi.json"));
          
          if (p[0] === '1' || p[0] === '2' || p[0] === '3' || p[0] === '4' || p[0] === '5') {
           
            if (isNaN(p[0])) {
              return reply('Harap masukkan nomer yang valid.');
            }
            data.topup = Number(p[0])
            fs.writeFileSync("./src/validasi.json", JSON.stringify(data, null, 2));
            reply(`plate tipe ${q} berhasil diupdate.`);
          } else {
            reply('Tipe pengguna tidak valid. Gunakan salah satu dari "1", "2", "3", "4", atau "5".\n\nContoh Penggunaan\n.plate 1');
          }
          }
          break;

    }
}
module.exports = FiturOwner
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});