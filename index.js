const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
require('./config')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        version
    })

    sock.ev.on('creds.update', saveCreds)

    // Load Commands
    const commands = new Map()
    fs.readdirSync('./commands').forEach(file => {
        const cmd = require(`./commands/${file}`)
        commands.set(cmd.name, cmd)
    })

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if (!msg.message) return
        if (msg.key.remoteJid === 'status@broadcast') return // auto status save removed

        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        const commandName = body.startsWith(global.prefix) ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null
        const args = body.trim().split(/ +/).slice(1)

        if (commands.has(commandName)) {
            await commands.get(commandName).execute(sock, msg.key.remoteJid, msg, args)
        }
    })

    console.log(`✅ ${global.Yomidu MD BOT} Started! Owner: ${global.Yomidu}`)
}

startBot()
