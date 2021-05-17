const admin = require('firebase-admin')
const db = admin.firestore()
const rates = require('./rates')

async function addPoundsToUid(uid, packages) {
    // Sum the pounds to uid
    let pounds = 0
    packages.forEach(package => {
        pounds +=
            package.volumetricWeight === 0
                ? parseInt(package.weight)
                : parseInt(package.volumetricWeight)
    })
    db.collection('users')
        .doc(uid)
        .update({poundsCount: admin.firestore.FieldValue.increment(parseInt(pounds))})
}
async function addToLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .update({lastId: admin.firestore.FieldValue.increment(1)})
}
async function getLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .get()
        .then(doc => {
            return doc.data()
        })
}

async function createDatabaseWithUserInfo(user) {
    return db
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            creationTime: Date.now(),
            role: 'user',
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateDatabaseWithUserInfo(uid, obj) {
    let lastId = await getLastId()
    return db
        .collection('users')
        .doc(uid)
        .update({
            name: obj.name,
            lastName: obj.lastName,
            box: `YGO${parseInt(lastId.lastId)}`,
            logs: [],
            poundsCount: 0,
            isUpdated: false,
            affiliateCardNo: null,
            birthdate: null,
        })
        .then(() => {
            addToLastId()
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnUserById(uid) {
    return db
        .collection('users')
        .doc(uid)
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
async function updateUserInfo(uid, userObj) {
    if (userObj.rate === 'lUCeno2AKMbUH7tydxFk' || userObj.rate === 'b4sjdrZNdlnRaPTpMps3') {
        //TODO:Tengo que mandar un correo para que lo revisen
        // console.log(userObj)
        if (userObj.businessAproved === undefined) {
            const emailHandler = require('./emailHandler')
            let emailBody = await emailHandler.templateHandler('Business-01', userObj)
            emailHandler.sendEmailForUserPetition(
                'lexelEZ@gmail.com',
                'Peticion de Usuario',
                emailBody,
                `${userObj.name} ${userObj.lastName}`
            )
            userObj.businessAproved = false
        }
    }
    return db
        .collection('users')
        .doc(uid)
        .update(userObj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function approveBusinessRequest(uid) {
    try {
        return db
            .collection('users')
            .doc(uid)
            .update({businessAproved: true})
            .then(() => {
                console.log('Document successfully written!')
                return 'Succesfull'
            })
    } catch (error) {
        console.log(error)
        return error
    }
}
async function changeVerified(uid, user) {
    return db
        .collection('users')
        .doc(uid)
        .update({isVerified: !user.isVerified})
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllUsers() {
    let users = []
    await db
        .collection('users')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return users
}
async function returnAllUserInformationByBox(box) {
    let users = await returnAllUsers()
    let currentSelectedUser = users.find(user => user.box === box)
    return currentSelectedUser
}
async function returnAllAffiliateCardNo() {
    // let users = await returnAllUsers()
    // return users.filter(user => user.affiliateCardNo != null).map(user => user.affiliateCardNo)
    return db
        .collection('general')
        .doc('AffiliatedNumberAvaliable')
        .get()
        .then(doc => {
            return doc.data().numbers
        })
        .catch(err => {
            return err
        })
}
async function removeAffiliateCardNo(number) {
    // let users = await returnAllUsers()
    // return users.filter(user => user.affiliateCardNo != null).map(user => user.affiliateCardNo)
    return await db
        .collection('general')
        .doc('AffiliatedNumberAvaliable')
        .update({
            numbers: admin.firestore.FieldValue.arrayRemove(number),
        })
        .then(() => {
            return 'Success'
        })
}
async function returnUserRateByBox(box) {
    let users = await returnAllUsers()
    let allRates = await rates.returnAllRates()
    let currentSelectedUser = users.find(user => user.box === box)
    return allRates.find(rate => currentSelectedUser.rate === rate.id)
}

module.exports = {
    addPoundsToUid,
    createDatabaseWithUserInfo,
    updateDatabaseWithUserInfo,
    returnUserById,
    updateUserInfo,
    changeVerified,
    approveBusinessRequest,
    returnAllUsers,
    returnAllUserInformationByBox,
    returnUserRateByBox,
    returnAllAffiliateCardNo,
    removeAffiliateCardNo,
}
