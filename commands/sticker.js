const { Sticker, StickerTypes } = require('wa-sticker-formatter')

module.exports = {
    name: 'sticker',
    execute: async (sock, from, msg) => {
        if (msg.message.imageMessage) {
            const buffer = await sock.downloadMediaMessage(msg)
            const sticker = new Sticker(buffer, {
                pack: global.botname,
                author: global.ownername,
                type: StickerTypes.FULL
            })
            await sock.sendMessage(from, await sticker.build())
        } else {
            await sock.sendMessage(from, { text: '📷 Send an image with caption .sticker' })
        }
    }
}
