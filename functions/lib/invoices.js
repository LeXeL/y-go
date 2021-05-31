const admin = require('firebase-admin')
const db = admin.firestore()
const fetch = require('node-fetch')

async function addToLastInvoiceId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastInvoiceId')
        .update({lastInvoiceId: admin.firestore.FieldValue.increment(1)})
}
async function getLastInvoiceId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastInvoiceId')
        .get()
        .then(doc => {
            return doc.data()
        })
}
async function calculatePriceForGroupedPackages(groupedPackages) {
    let total = 0.0
    groupedPackages.forEach(package => {
        total += parseFloat(package.totalPrice)
    })
    return total.toFixed(2)
}
function groupPackagesByBox(packages) {
    //Groups every packages according to its box id.
    let groupedPackages = {}
    packages.forEach(package => {
        if (Object.keys(groupedPackages).includes(package.box)) {
            groupedPackages[package.box].push(package)
        } else {
            groupedPackages[package.box] = [package]
        }
    })
    return groupedPackages
}
async function createInvoice(by, subsidiary) {
    const packages = require('./packages')
    const users = require('./users')
    const emailHandler = require('./emailHandler')
    try {
        let allPackages = await packages.returnAllPackagesWithoutInvoice()
        let filteredPackagesBySubsidiary = allPackages.filter(
            pckg => pckg.subsidiary === subsidiary
        )
        let groupedPackages = await groupPackagesByBox(filteredPackagesBySubsidiary)
        for (const box in groupedPackages) {
            if (groupedPackages.hasOwnProperty(box)) {
                const element = groupedPackages[box]
                let lastInvoiceId = await getLastInvoiceId()
                let price = await calculatePriceForGroupedPackages(element)
                let userFromBox = await users.returnAllUserInformationByBox(box)
                let obj = {
                    No: parseInt(lastInvoiceId.lastInvoiceId),
                    box: box,
                    userId: userFromBox.id,
                    creationTime: Date.now(),
                    packages: element,
                    paidTime: '',
                    status: 'unpaid', //paid, unpaid
                    price: price,
                    by: by,
                    isAffiliate: userFromBox.affiliateCardNo === null ? false : true,
                }
                await db
                    .collection('invoices')
                    .add(obj)
                    .then(docRef => {
                        element.forEach(package => {
                            package.invoice = docRef.id
                            packages.updatePackageById(package.id, package)
                        })
                    })
                    .catch(error => {
                        return error
                    })
                await addToLastInvoiceId()
                let emailBody = await emailHandler.templateHandler('Invoice-01', obj)
                users.addPoundsToUid(userFromBox.id, element)
                emailHandler.sendEmail(
                    userFromBox.email,
                    'Recepcion de Mercancia Y-Go 📦',
                    emailBody,
                    `${userFromBox.name} ${userFromBox.lastName}`
                )
            }
        }
    } catch (error) {
        console.error(error)
        return error
    }

    return 'completed'
}
async function updateInvoice(id, Obj) {
    return db
        .collection('invoices')
        .doc(id)
        .update(Obj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function deleteInvoice(id) {
    return db
        .collection('invoices')
        .doc(id)
        .update({status: 'inactive'})
        .then(() => {
            console.log('Document successfully deleted!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllInvoices() {
    let Invoices = []
    await db
        .collection('invoices')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                Invoices.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return Invoices
}
async function returnInvoiceById(id) {
    return db
        .collection('invoices')
        .doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data()
            } else {
                console.log('Document no existe')
            }
        })
        .catch(error => {
            return error
        })
}
async function returnAllInvoiceByUid(uid) {
    let invoices = []
    await db
        .collection('invoices')
        .where('userId', '==', uid)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                invoices.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return invoices
}
async function handleInvoicePayment(payload) {
    axios
    fetch('https://secure.nmi.com/api/transact.php', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(payload),
    })
        .then(res => res.text())
        .then(responseData => {
            let data = responseData.split('&')
            let response = data[8].split('=')[1]
            console.log(response)
            // if (response === '100') {
            //     // console.log('transaccion exitosa')
            //     api.payInvoices({
            //         invoices: this.cart,
            //         paymentMethod: 'VISA',
            //         orderId: data[3].split('=')[1],
            //     }).then(response => {
            //         this.alertMessage = 'Transaccion Existosa'
            //         this.alertType = 'success'
            //         this.displayLoading = false
            //         this.displayAlert = true
            //     })
            //     return
            // }
            // if (response === '200') {
            //     console.log('transaccion declinada')
            //     this.alertTitle = 'Error'
            //     this.alertMessage = 'Lo sentimos no pudimos procesar tu pago, intentalo mas tarde'
            //     this.alertType = 'error'
            //     this.displayLoading = false
            //     this.displayAlert = true
            //     return
            // } else {
            //     console.log(ResponseMap.get(response))
            //     this.alertTitle = 'Error'
            //     this.alertMessage = ResponseMap.get(response).translation
            //     this.alertType = 'error'
            //     this.displayLoading = false
            //     this.displayAlert = true
            // }
        })
        .catch(error => console.error(error))
}

async function payInvoices(invoices = null, method, image = null, orderId = null, payload = null) {
    const users = require('./users')
    const emailHandler = require('./emailHandler')
    let userFromBox = await users.returnAllUserInformationByBox(invoices[0].box)
    if (method.toUpperCase() === 'VISA' || method.toUpperCase() === 'MASTERCARD') {
        // await handleInvoicePayment(payload)
        try {
            for await (const invoice of invoices) {
                invoice.status = 'paid'
                invoice.paymentMethod = method.toUpperCase()
                invoice.paymentDate = Date.now()
                invoice.credicorpOrderId = orderId
                await updateInvoice(invoice.id, {...invoice})
            }
            let emailBody = await emailHandler.templateHandler('Invoice-02', invoices)
            emailHandler.sendEmail(
                userFromBox.email,
                'Pago de Mercancia Y-Go 💸',
                emailBody,
                `${userFromBox.name} ${userFromBox.lastName}`
            )
            return 'Success'
        } catch (error) {
            console.log(error)
            return error
        }
    }
    if (method.toUpperCase() === 'ACH') {
        try {
            for await (const invoice of invoices) {
                invoice.status = 'review'
                invoice.paymentMethod = method.toUpperCase()
                invoice.paymentDate = Date.now()
                await updateInvoice(invoice.id, {...invoice})
            }
            let emailBody = await emailHandler.templateHandler('Invoice-02', invoices)
            emailHandler.sendEmail(
                userFromBox.email,
                'Pago de Mercancia Y-Go 💸',
                emailBody,
                `${userFromBox.name} ${userFromBox.lastName}`
            )
            return 'Success'
        } catch (error) {
            return error
        }
    }
}
module.exports = {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    returnAllInvoices,
    returnInvoiceById,
    returnAllInvoiceByUid,
    payInvoices,
}
