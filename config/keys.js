const keys = {
    postgres: {
        client: 'pg',
        host: '127.0.0.1',
        port: 5432,
        user: 'cubex',
        password: 'cubex',
        database: 'edo',
        charset: 'utf8'
    },
    secret: '456789-735459-165756-478266',
    nodemailer: {
        service: 'gmail',
        auth: {
            user: 'perkosrakkukutsaplevich@gmail.com',
            pass: 'perkosrak9379992',
        },
        from: '"EDO" <perkosrakkukutsaplevich@gmail.com>',
        to: 'anton.holkovsky@qbex.io',
        subject: 'Password recovery(EDO)',
        text: 'Here is ur new password',
        html: '<b>mamba mamba huyamba!</b>'
    }
}

module.exports = keys