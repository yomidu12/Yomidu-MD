module.exports = {
    name: 'menu',
    execute: async (sock, from) => {
        const text = `
👋 Hello! I am ${global.Yomidu MDBOT}
✅ Developed by: ${global.Yomidu}

📌 Commands List:
.menu - Show this menu
.sticker - Image/Video to sticker
.ytmp3 <url> - YouTube to MP3
.ai <question> - Ask AI
.add/.kick/.promote/.demote - Group controls
`
        await sock.sendMessage(from, { text })
    }
}
