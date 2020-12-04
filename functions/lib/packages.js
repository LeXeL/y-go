const admin = require('firebase-admin')
const db = admin.firestore()

async function calculatePackagePrices(package) {
    const users = require('./users')
    let rateForCurrentBox = await users.returnUserRateByBox(package.box)
    if (rateForCurrentBox.calculateVolumetric) {
        let volumetricWeight = (package.height * package.long * package.width) / 138.4
        let volumatricWeightTrunkNumber = parseInt(volumetricWeight)
        if (volumetricWeight > volumatricWeightTrunkNumber) volumatricWeightTrunkNumber += 1
        let price =
            package.weight > volumatricWeightTrunkNumber
                ? parseFloat(package.weight * rateForCurrentBox.rate).toFixed(2)
                : parseFloat(volumatricWeightTrunkNumber * rateForCurrentBox.rate).toFixed(2)
        let totalPrice = 0.0
        if (package.aditionalCharges.length > 0) {
            package.aditionalCharges.forEach(el => {
                totalPrice += el.chargeAmount
            })
        }
        totalPrice += parseFloat(price)
        totalPrice = parseFloat(totalPrice).toFixed(2)
        return {price, totalPrice}
    }
    let price = parseFloat(package.weight * rateForCurrentBox.rate).toFixed(2)
    let totalPrice = 0.0
    if (package.aditionalCharges.length > 0) {
        package.aditionalCharges.forEach(el => {
            totalPrice += el.chargeAmount
        })
    }
    totalPrice += parseFloat(price)
    totalPrice = parseFloat(totalPrice).toFixed(2)
    return {price, totalPrice}
}

async function createPackage(package) {
    let prices = await calculatePackagePrices(package)
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
            price: prices.price,
            totalPrice: prices.totalPrice,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            console.log(error)
            return error
        })
}
async function createPackagesFromXls(packages) {
    try {
        for await (const package of packages) {
            // let prices = await calculatePackagePrices(package)
            db.collection('packages')
                .doc()
                .set({
                    tracking: package.tracking,
                    box: !!package.box ? package.box : null,
                    weight: package.weight,
                    long: package.long,
                    height: package.height,
                    width: package.width,
                    creationTime: Date.now(),
                    by: package.by,
                    supplierInvoice: package.supplierInvoice,
                    supplierInvoiceDate: package.supplierInvoiceDate,
                    aditionalCharges: [],
                    invoice: null,
                    // price: prices.price,
                    // totalPrice: prices.totalPrice,
                })
                .then(() => {
                    console.log('Succesfully added')
                })
                .catch(error => {
                    console.log(error)
                })
        }
        return 'success'
    } catch (error) {
        console.log(error)
        return error
    }
}
async function updateGroupPackages(packages) {
    try {
        for await (const package of packages) {
            if (package.box != null) {
                console.log(`package: ${JSON.stringify(package)}`)
                let prices = await calculatePackagePrices(package)
                package.price = prices.price
                package.totalPrice = prices.totalPrice
            }
            let id = package.id
            delete package.id
            db.collection('packages')
                .doc(id)
                .update(package)
                .then(() => {
                    console.log('Succesfully updated')
                })
                .catch(error => {
                    console.log(error)
                })
        }
        return 'success'
    } catch (error) {
        console.log(error)
        return error
    }
}
async function updatePackageById(id, Obj) {
    try {
        let prices = await calculatePackagePrices(Obj)
        Obj.price = prices.price
        Obj.totalPrice = prices.totalPrice
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
    } catch (error) {
        console.log(error)
        return error
    }
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
    const invoices = require('./invoices')
    let invoicesData = await invoices.returnAllInvoices()
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
                let obj = doc.data()
                if (obj.invoice != null) {
                    obj.invoice = invoicesData.filter(invoice => invoice.id === obj.invoice)[0].No
                    packages.push({...obj, id: doc.id})
                }
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return packages
}

module.exports = {
    createPackage,
    createPackagesFromXls,
    updatePackageById,
    updateGroupPackages,
    deletePackage,
    returnAllPackages,
    returnAllPackagesWithoutInvoice,
    returnAllPackagesWithInvoice,
}
