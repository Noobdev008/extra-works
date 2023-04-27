const user_type = {
    COMPANY: 'COMPANY',
    ADMIN: 'ADMIN'
}

const user_status = {
    BLOCK: 'block',
    UNBLOCK: 'unblock'
}


const error_msg = {
    EXPIRED: "jwt expired",
    INVALID: "invalid signature"
}

module.exports = { user_type, user_status, error_msg }


