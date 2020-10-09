const admin = require('firebase-admin')
const db = admin.firestore()

async function createRate(rate) {
    return db
        .collection('rates')
        .doc()
        .set({
            name: rate.name,
            price: rate.price,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateRate(id, Obj) {
    return db
        .collection('rates')
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
async function deleteRate(id) {
    return db
        .collection('rates')
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
async function returnAllRates() {
    let rates = []
    await db
        .collection('rates')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                rates.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return rates
}
module.exports = {
    createRate,
    updateRate,
    deleteRate,
    returnAllRates,
}
