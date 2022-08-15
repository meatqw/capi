const nodemailer = require("nodemailer");


class sendController {
    async SendMail(name, mail, phone, docs) {
        let testEmailAccount = await nodemailer.createTestAccount();

        let doc = ''
        for (var i = 0; i < docs['docs'].length; i++){
            doc += 'http://37.46.129.236/uploads/' + docs['docs'][i] + '\n'
        }
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "121cf0a3256734",
            pass: "0fe9e6450d4ecd",
            },
        });

        let result = await transport.sendMail({
            from: "Цитадель <example@gmail.com>",
            to: "user@example.com, user@example.com",
            subject: "Заявка",
            text: `Имя: ${name}\nПочта: ${mail}\nТелефон: ${phone}\nДокументы:\n ${doc}`,
            html: `<strong>Имя: </strong>${name}</br>
            <strong>Почта: </strong>${mail}</br>
            <strong>Телефон: </strong>${phone}</br>
            <strong>Документы: </strong><br>${doc}`,
        });

        console.log(result);
    }
}

module.exports = new sendController;
