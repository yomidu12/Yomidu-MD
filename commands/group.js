module.exports = {
    name: 'kick',
    execute: async (sock, from, msg, args) => {
        if (!msg.key.participant.includes(global.owner[0])) return
        const user = args[0].replace('@','') + '@s.whatsapp.net'
        await sock.groupParticipantsUpdate(from, [user], 'remove')
    }
}
