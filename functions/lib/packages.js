const admin = require('firebase-admin')
const db = admin.firestore()

async function createPackage(package) {
    return db
        .collection('packages')
        .doc()
        .set({
            tracking: package.tracking,
            box: package.box,
            weight: package.weight,
            long: package.long,
            height: package.height,
            width: package.width,
            creationTime: Date.now(),
            by: package.by,
            supplierInvoice: package.supplierInvoice,
            supplierInvoiceDate: package.supplierInvoiceDate,
            aditionalCharges: package.aditionalCharges,
            invoice: null,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updatePackage(id, Obj) {
    return db
        .collection('packages')
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
async function deletePackage(id) {
    return db
        .collection('packages')
        .doc(id)
        .delete()
        .then(() => {
            console.log('Document successfully deleted!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllPackages() {
    let packages = []
    await db
        .collection('packages')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                packages.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return packages
}
async function returnAllPackagesWithoutInvoice() {
    let packages = []
    await db
        .collection('packages')
        .where('invoice', '==', null)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                packages.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return packages
}
async function returnAllPackagesWithInvoice() {
    let packages = []
    await db
        .collection('packages')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                packages.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return packages.filter(package => {
        if (package.invoice !== null) {
            return null
        }
    })
}

module.exports = {
    createPackage,
    updatePackage,
    deletePackage,
    returnAllPackages,
    returnAllPackagesWithoutInvoice,
    returnAllPackagesWithInvoice,
}
