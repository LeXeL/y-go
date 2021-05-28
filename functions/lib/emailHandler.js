const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const sgMail = require('@sendgrid/mail')

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

    let emailBody = `
  
    <h1 style="text-align: center; margin: 0">RECEPCION DE MERCANCIA</h3>
 
  <p>
    Le informamos, la llegada de un envio. A continuación le detallamos el
    mismo:
  </p>
  <div style="padding: 15px;">
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
  </div>
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
            text-align: center;">REALIZAR PAGO</a>
            </div>`
    return emailBody
}
function templateInvoice02(info) {
    let packagesHtmlBody = ''
    let totalPoundsEarn = 0
    let totalPrice = 0
    for (const invoice of info) {
        invoice.packages.forEach(package => {
            let weight = package.volumetricWeight === 0 ? package.weight : package.volumetricWeight
            packagesHtmlBody += `
            <tr>
            <td>${package.tracking}</td>
            <td>${weight}</td>
            <td style="text-align: right">$${package.price}</td>
          </tr>`
            totalPoundsEarn += parseInt(weight)
            totalPrice += parseFloat(package.price)
        })
    }
    let emailBody = `<div style="padding: 15px;">
    <h1 style="text-align: center; margin: 0">FACTURA PAGADA</h3>
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
    <h3 style="text-align: right"><strong>Total: $ ${totalPrice}</strong></h3>
   ${
       info.isAffiliate
           ? `<h4 style="text-align: right"><strong>Puntos obtenidos: ${totalPoundsEarn}</strong></h4>`
           : ''
   }
  </div>`
    return emailBody
}
function templateInvoice03(info) {
    let emailBody = `<div style="padding: 15px;">
    <h1 style="text-align: center; margin: 0">PAGO RECIBIDO</h1>

    <p> Un administrador estará revisando tu comprobante de pago y te confirmaremos si todo esta bien </p>


  </div>`
    return emailBody
}
function templateBusiness01(info) {
    let emailBody = `<div style="padding: 15px;">
    
    <h3><strong>Quiere una petición de Business Plan</h3>
  </div>`
    return emailBody
}

async function templateHandler(id, information) {
    if (id === 'Invoice-01') {
        return templateInvoice01(information)
    }
    if (id === 'Invoice-02') {
        return templateInvoice02(information)
    }
    if (id === 'Invoice-03') {
        return templateInvoice03(information)
    }
    if (id === 'Business-01') {
        return templateBusiness01(information)
    }
}

async function sendEmail(to, subject, template, name) {
    sgMail.setApiKey(functions.config().emailservice.key)
    const msg = {
        to: to,
        from: 'no-reply@y-go.com.pa', // Use the email address or domain you verified above
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
          </div>
          <div style="padding: 15px;">
            <p>
              <strong
                >Estimado cliente
                <span style="color: #ff5722">${name}</span></strong
              >
            </p>
            </div>          
            ${template}
            <br />
            <div style="padding: 15px">
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
async function sendEmailForUserPetition(to, subject, template, user) {
    sgMail.setApiKey(functions.config().emailservice.key)
    const msg = {
        to: to,
        from: 'no-reply@y-go.com.pa', // Use the email address or domain you verified above
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
            //   <h3 style="text-align: center; margin: 0">PETICIÓN DE USUARIO</h3>
            </div>
          </div>
          <div style="padding: 15px;">
            <p>
              <strong>El cliente</strong>
                <span style="color: #ff5722">${user.name} ${user.lastName}</span>
                <br>
                <span style="color: #ff5722">Email: ${user.email}</span>
                <br>
                <span style="color: #ff5722">Teléfono: ${user.phone} </span>
                <br>
                <span style="color: #ff5722">Casillero: ${user.box} </span>
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
async function sendEmailToFinance(image, subject, info) {
    console.log(`Info :${JSON.stringify(info)}`)
    let packagesHtmlBody = ''
    let totalPrice = 0
    for (const invoice of info.invoices) {
        invoice.packages.forEach(package => {
            let weight = package.volumetricWeight === 0 ? package.weight : package.volumetricWeight
            packagesHtmlBody += `
            <tr>
            <td>${package.tracking}</td>
            <td>${weight}</td>
            <td style="text-align: right">$${package.price}</td>
          </tr>`
            totalPrice += parseFloat(package.price)
        })
    }
    sgMail.setApiKey(functions.config().emailservice.key)
    const msg = {
        to: 'finanzas@y-go.com.pa',
        from: 'no-reply@y-go.com.pa', // Use the email address or domain you verified above
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
            <h3 style="text-align: center; margin: 0">REVISION DE PAGO</h3>
            </div>
          </div>

          <div style="padding: 15px;">
            <span> Información de la factura No ${info.invoices[0].No}</span> 
            <br>
            <p>
              <strong>Información del cliente:</strong>
                <span style="color: #ff5722">${info.userFromBox.name} ${info.userFromBox.lastName}</span>
                <br>
                <span style="color: #ff5722">Email: ${info.userFromBox.email}</span>
                <br>
                <span style="color: #ff5722">Teléfono: ${info.userFromBox.phone} </span>
                <br>
                <span style="color: #ff5722">Casillero: ${info.userFromBox.box} </span>
            </p>
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
            <h3 style="text-align: right"><strong>Total: $ ${totalPrice}</strong></h3>
        </div>
          <div style="padding: 15px;">
            <span> Comprobante: </span>
            <br>
            <img src="cid:comprobante" alt="image" />
          </div>
        </body>
      </html>
      `,
        attachments: [
            {
                content: image,
                filename: 'image2',
                type: 'image/jpeg',
                content_id: 'comprobante',
                disposition: 'inline',
            },
        ],
    }
    sgMail
        .send(msg)
        .then(response => {
            console.log(`Emails Sent to finanzas@y-go.com.pa with status:${response}`)
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
    sendEmailToFinance,
}
