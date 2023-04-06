'use strict';

const authSchema = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS auth (
        id UUID PRIMARY KEY default gen_random_uuid(),
        phone_number VARCHAR(15),
        user_id UUID NOT NULL
    )
`;

let db;
function Auth(authDetails) {
    this.phone_number = authDetails.phone_number;
    this.user_id = authDetails.user_id;
}

Auth.init = async(_db) => {
    db = _db;
    await db.query(authSchema);
}

Auth.create = (user_id) => {
    const query = {
        text: "INSERT INTO auth (user_id) VALUES ($1) returning *",
        values: [user_id]
    }
    return db.query(query);
}


Auth.getByUserId = (user_id) => {
    const query = {
        text: "SELECT * FROM auth WHERE user_id=$1",
        values: [user_id]
    }

    return db.query(query);
}

Auth.update = async(user_id, newAuth) => {
    const query = {
        text: "UPDATE auth SET phone_number=$1 WHERE user_id=$2 returning *",
        values: [newAuth.phone_number, user_id]
    }
    return db.query(query);
}

module.exports = Auth;