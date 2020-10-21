const admin = require('firebase-admin')
const db = admin.firestore()
const package = require('./packages')
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
    //TODO:
    // [ ] falta calcular precio,
    // [ ] falta poner un custom id a los invoice,
    // [ ] falta una vez se guarde sacar el id del invoice generado y asignarlo a su paquete correspondiente
    let packages = await package.returnAllPackagesWithoutInvoice()
    let groupedPackages = await groupPackagesByBox(packages)
    try {
        for (const box in groupedPackages) {
            if (groupedPackages.hasOwnProperty(box)) {
                const element = groupedPackages[box]
                db.collection('invoices')
                    .doc()
                    .add({
                        box: box,
                        creationTime: Date.now(),
                        packages: element,
                        paidTime: '',
                        status: 'unpaid', //paid, unpaid
                    })
                    .then(docRef => {
                        console.log(docRef)
                    })
                    .catch(error => {
                        return error
                    })
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
        .where('status', '==', 'active')
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
