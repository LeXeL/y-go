async function returnUserProfileInformation(uid) {
    const users = require('./users')
    const invoices = require('./invoices')
    let obj = {}
    obj.user = await users.returnUserById(uid)
    obj.invoices = await invoices.returnAllInvoiceByUid(uid)
    return obj
}

module.exports = {
    returnUserProfileInformation,
}
