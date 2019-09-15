const sendSms = async (phone) => {
    return new Promise((resolve, reject) => {
        if(phone === '0600000000' || phone === '+33600000000'){
            resolve()
        }else{
            reject()
        }
    })
};

const confirmationCode = async (phone, code) => {

};

export {
    sendSms,
    confirmationCode
}