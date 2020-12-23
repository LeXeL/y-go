const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const sgMail = require('@sendgrid/mail')

// const transporter = nodemailer.createTransport({
//     host: functions.config().emailservice.host,
//     port: 465,
//     secure: true,
//     auth: {
//         user: functions.config().emailservice.username,
//         pass: functions.config().emailservice.pass,
//     },
// })
// function templateUser01(info) {
//     return `<div class="email-content">
//     <p>
//         Bienvenido a nuestro servicio de Moving Beer,
//     Pronto estaremos atendiendo su solicitud, de necesitar alguna corrección se lo indicaremos al
//     correo electrónico suministrado. De lo contrario, le llegará un correo indicando que su cuenta esta
//     activa y lista para ser usada.
//     Gracias ${info.restaurantName} por elegir MovingBeer, es un gusto para nosotros suministrarte la
//     cerveza.
//     Salud!
//     </p>
//   </div>`
// }
// function templateUser02(info) {
//     return `<div class="email-content">
//     <p>
//     Su cuenta de ${info.restaurantName} ha sido aprobada y está lista para pedir cerveza.
//     Estamos contentos de poder contar con ustedes como parte de nuestros clientes, nos
//     encargaremos que la cerveza no les falte y que lo más complicado sea decidir cuál elegir. Del resto
//     nos encargamos nosotros.
//     Atentamente,

//     Equipo Brewthers
//     </p>
//   </div>`
// }
// function templateUser03(info) {
//     let reason = ''
//     let section = info.logs[info.logs.length - 1].section
//     section.forEach(element => {
//         reason += `<li>${element}</li>`
//     })
//     return `<div class="email-content">
//     <p>
//     Su cuenta de (nombre comercio) ha sido rechazada porque

//     <ol>
//           ${reason}
//         </ol>

//     Por favor realizar la corrección señalada dentro de su perfil creado en nuestra página web.
//     En caso de existir un error, pedimos disculpas por el inconveniente y puede contactarse con
//     nosotros a movingbeer3@gmail.com.
//     Atentamente,

//     Equipo Brewthers
//     </p>
//   </div>`
// }
// async function templateOrder01(info) {
//     let cart = ''
//     info.cart.forEach(element => {
//         cart += `<li>${JSON.stringify(element)}</li>`
//     })
//     return `<div class="email-content">
//     <p>
//     En breve le estaremos contactando al número de teléfono suministrado en su perfil, para que
//     juntos revisemos y validemos la orden generada y pasar a la preparación.
//     Saludos,

//     Equipo Bewthers
//     </p>
//   </div>`
// }
// async function templateOrder02(info) {
//     return `<div class="email-content">
//     <p>
//     Ya estamos preparando tu orden ${info.id}.
//     Puedes revisar el estado de tu pedido dentro de nuestra página web, pronto nos estaremos
//     contactando para coordinar la entrega.
//     Saludos,

//     Equipo Brewthers
//     </p>
//   </div>`
// }
// async function templateOrder03(info) {
//     return `<div class="email-content">
//     <p>
//     Estamos felices de poder decirte que la cerveza está en camino, contamos con la dirección del
//     local pero puede que nuestro conductor se contacte para confirmar la hora de entrega.
//     Gracias por elegir MovingBeer.

//     Equipo Bewthers
//     </p>
//   </div>`
// }
function templateInvoice01(info) {
    let packagesHtmlBody = ''
    let totalPoundsEarn = 0
    info.packages.forEach(package => {
        let weight = package.volumetricWeight === 0 ? package.weight : package.volumetricWeight
        packagesHtmlBody += `<tr>
        <td>${package.tracking}</td>
        <td>${weight}</td>
        <td style="text-align: right">$${package.price}</td>
      </tr>`
        totalPoundsEarn += parseInt(weight)
    })

    let emailBody = `<div style="padding: 15px;">
    <table style="width: 100%">
      <thead>
        <tr>
          <th style="text-align: left">Tracking</th>
          <th style="text-align: left">Peso</th>
          <th style="text-align: right">Monto</th>
        </tr>
      </thead>
      <tbody>
        ${packagesHtmlBody}
      </tbody>
    </table>
    <h3 style="text-align: right"><strong>Total: $ ${info.price}</strong></h3>
   ${
       info.isAffiliate
           ? `<h4 style="text-align: right"><strong>Puntos obtenidos: ${totalPoundsEarn}</strong></h4>`
           : ''
   }
  </div>`
    return emailBody
}
function templateBusiness01(info) {
    let emailBody = `<div style="padding: 15px;">
    
    <h3><strong>Quiere una peticion de Business Plan</h3>
  </div>`
    return emailBody
}

async function templateHandler(id, information) {
    if (id === 'Invoice-01') {
        return templateInvoice01(information)
    }
    if (id === 'Business-01') {
        return templateBusiness01(information)
    }
}

async function sendEmail(to, subject, template, name) {
    sgMail.setApiKey(functions.config().emailservice.key)
    const msg = {
        to: to,
        from: 'no-replay@y-go.com.pa', // Use the email address or domain you verified above
        subject: subject,
        html: `<html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0;">
          <div style="background-color: #01bcd4;
          padding: 15px;
          color: #fff;">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/y-go-9fa3f.appspot.com/o/logo_ygo.png?alt=media&token=421f6d76-60aa-4006-9494-f001b8650b77"
                width="70px"
                style="margin: 0 auto; display: block; margin-bottom: 10px"
              />
            </div>
            <div>
              <h3 style="text-align: center; margin: 0">RECEPCION DE MERCANCIA</h3>
            </div>
          </div>
          <div style="padding: 15px;">
            <p>
              <strong
                >Estimado cliente
                <span style="color: #ff5722">${name}</span></strong
              >
            </p>
            <p>
              Le informamos, la llegada de un envio. A continuación le detallamos el
              mismo:
            </p>
          </div>
            ${template}
          <div style="padding: 15px">
            <a href="https://y-go.com.pa/user" style="padding: 10px;
            background-color: #ff5722;
            color: #fff;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            margin-top: 25px;
            display: block;
            margin: 0 auto;
            text-align: center;">IR A MI CASILLERO</a>
            <br />
            <p>GRACIAS POR PREFERIRNOS</p>
            <p style="color: #ff5722; text-align: center">
              ***FAVOR NO RESPONDER ESTE CORREO***
            </p>
          </div>
        </body>
      </html>
      `,
    }
    sgMail
        .send(msg)
        .then(response => {
            console.log(`Emails Sent to ${to} with status:${response}`)
        })
        .catch(error => {
            console.error(error)

            if (error.response) {
                console.error(error.response.body)
            }
        })
}
async function sendEmailForUserPetition(to, subject, template, name) {
    sgMail.setApiKey(functions.config().emailservice.key)
    const msg = {
        to: to,
        from: 'no-replay@y-go.com.pa', // Use the email address or domain you verified above
        subject: subject,
        html: `<html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0;">
          <div style="background-color: #01bcd4;
          padding: 15px;
          color: #fff;">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/y-go-9fa3f.appspot.com/o/logo_ygo.png?alt=media&token=421f6d76-60aa-4006-9494-f001b8650b77"
                width="70px"
                style="margin: 0 auto; display: block; margin-bottom: 10px"
              />
            </div>
            <div>
              <h3 style="text-align: center; margin: 0">PETICION DE USUARIO</h3>
            </div>
          </div>
          <div style="padding: 15px;">
            <p>
              <strong
                >El cliente
                <span style="color: #ff5722">${name}</span></strong
              >
            </p>
          </div>
            ${template}
         
        </body>
      </html>
      `,
    }
    sgMail
        .send(msg)
        .then(response => {
            console.log(`Emails Sent to ${to} with status:${response}`)
        })
        .catch(error => {
            console.error(error)

            if (error.response) {
                console.error(error.response.body)
            }
        })
}

module.exports = {
    templateHandler,
    sendEmail,
    sendEmailForUserPetition,
}
