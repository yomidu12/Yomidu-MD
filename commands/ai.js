const fetch = require('node-fetch')
module.exports = {
    name: 'ai',
    execute: async (sock, from, msg, args) => {
        const question = args.join(' ')
        if (!question) return await sock.sendMessage(from, { text: '❓ Enter a question' })
        // Replace with your AI API
        await sock.sendMessage(from, { text: `🤖 AI says: Sorry, demo mode only.` })
    }
}
