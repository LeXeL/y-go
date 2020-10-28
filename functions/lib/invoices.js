const admin = require('firebase-admin')
const db = admin.firestore()
const packages = require('./packages')

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
async function createInvoice() {
    let allPackages = await packages.returnAllPackagesWithoutInvoice()
    let groupedPackages = await groupPackagesByBox(allPackages)
    try {
        for (const box in groupedPackages) {
            if (groupedPackages.hasOwnProperty(box)) {
                const element = groupedPackages[box]
                let lastInvoiceId = await getLastInvoiceId()
                let price = await calculatePriceForGroupedPackages(element)
                await db
                    .collection('invoices')
                    .add({
                        No: parseInt(lastInvoiceId.lastInvoiceId),
                        box: box,
                        creationTime: Date.now(),
                        packages: element,
                        paidTime: '',
                        status: 'unpaid', //paid, unpaid
                        price: price,
                    })
                    .then(docRef => {
                        element.forEach(package => {
                            package.invoice = docRef.id
                            packages.updatePackage(package.id, package)
                        })
                    })
                    .catch(error => {
                        return error
                    })
                await addToLastInvoiceId()
            }
        }
    } catch (error) {
        console.log(error)
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
module.exports = {
    createInvoice,
    updateInvoice,
    deleteInvoice,
    returnAllInvoices,
}