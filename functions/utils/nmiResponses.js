let ResponseMap = new Map()
ResponseMap.set('100', {error: 'Transaction was approved', translation: 'Transacción aprobada.'})
ResponseMap.set('200', {
    error: 'Transaction was declined by processor',
    translation: 'Transacción declinada por procesador.',
})
ResponseMap.set('201', {error: 'Do not honor', translation: 'Do not honor? wtf.'})
ResponseMap.set('202', {error: 'Insufficient funds', translation: 'Fondos insuficientes.'})
ResponseMap.set('203', {error: 'Over limit', translation: 'Over limit?.'})
ResponseMap.set('204', {error: 'Transaction not allowed', translation: 'Transacción no permitida.'})
ResponseMap.set('220', {
    error: 'Incorrect payment information',
    translation: 'Información de pago incorrecta.',
})
ResponseMap.set('221', {
    error: 'No such card issuer',
    translation: 'Usuario se tarjeta inexistente.',
})
ResponseMap.set('222', {
    error: 'No card number on file with issuer',
    translation: 'No se encontró numero de tarjeta con ese usuario.',
})
ResponseMap.set('223', {error: 'Expired card', translation: 'Tarjeta expirada.'})
ResponseMap.set('224', {
    error: 'Invalid expiration date',
    translation: 'Fecha de expiración invalida.',
})
ResponseMap.set('225', {
    error: 'Invalid card security code',
    translation: 'Código de seguridad invalido.',
})
ResponseMap.set('226', {error: 'Invalid PIN', translation: 'PIN invalido.'})
ResponseMap.set('240', {
    error: 'Call issuer for further information',
    translation: 'Llame a su banco para mayor información.',
})
ResponseMap.set('250', {error: 'Pick up card', translation: 'Recoger tarjeta.'})
ResponseMap.set('251', {error: 'Lost card', translation: 'Tarjeta perdida.'})
ResponseMap.set('252', {error: 'Stolen card', translation: 'Tarjeta robada.'})
ResponseMap.set('253', {error: 'Fraudulent card', translation: 'Tarjeta fraudulenta.'})
ResponseMap.set('260', {
    error: 'Declined with further instructions available. (See response text)',
    translation: '',
})
ResponseMap.set('261', {
    error: 'Declined-Stop all recurring payments',
    translation: 'Declinada, se detuvieron los pagos recurrentes.',
})
ResponseMap.set('262', {
    error: 'Declined-Stop this recurring program',
    translation: 'Declinada, se detuvo este programa recurrente.',
})
ResponseMap.set('263', {
    error: 'Declined-Update cardholder data available',
    translation: 'Declinada, actualizar información del  tarjetahabiente.',
})
ResponseMap.set('264', {
    error: 'Declined-Retry in a few days',
    translation: 'Declinada, vuelva a intentar en unos días.',
})
ResponseMap.set('300', {
    error: 'Transaction was rejected by gateway',
    translation: 'Transacción rechazada por gateway.',
})
ResponseMap.set('400', {
    error: 'Transaction error returned by processor',
    translation: 'Transacción rechazada por procesador.',
})
ResponseMap.set('410', {
    error: 'Invalid merchant configuration',
    translation: 'Configuración invalida de vendedor.',
})
ResponseMap.set('411', {
    error: 'Merchant account is inactive',
    translation: 'Cuenta de vendedor inactiva.',
})
ResponseMap.set('420', {error: 'Communication error', translation: 'Error de comunicación.'})
ResponseMap.set('421', {
    error: 'Communication error with issuer',
    translation: 'Error de comunicación con el banco.',
})
ResponseMap.set('430', {
    error: 'Duplicate transaction at processor',
    translation: 'Transacción duplicada.',
})
ResponseMap.set('440', {
    error: 'Processor format error',
    translation: 'Error en formato de procesador.',
})
ResponseMap.set('441', {
    error: 'Invalid transaction information',
    translation: 'Información de transacción invalida.',
})
ResponseMap.set('460', {
    error: 'Processor feature not available',
    translation: 'Funcionalidad de procesador no disponible.',
})
ResponseMap.set('461', {
    error: 'Unsupported card type',
    translation: 'Tipo de tarjeta no soportado.',
})

module.exports = {ResponseMap}
