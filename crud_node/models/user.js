'use strict';

const userSchema = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS users (
        id uuid primary key default gen_random_uuid(),
        name varchar(50) not null,
        email varchar(50) not null unique,
        password varchar(100) not null,
        type varchar(10) not null 
    );
`;

let db;
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.type = user.type;
}

User.init = async(_db) => {
    db = _db;
    await db.query(userSchema)
}

User.create = (newUser) => {
    const query = {
        text: 'INSERT INTO users( name, email, password, type) VALUES($1, $2, $3, $4) returning *',
        values: [ newUser.name, newUser.email, newUser.password, newUser.type],
    }
    return db.query(query);
}

User.findByEmail = (email) => {
    const query = {
        text: 'SELECT * from users where email=$1',
        values: [email]
    }
    return db.query(query);
}

User.findById = (id) => {
    const query = {
        text: 'SELECT * from users where id=$1',
        values: [id]
    }
    return db.query(query);
}

User.get = (id) => {
    const query = {
        text: 'select users.id, name, email, phone_number from users inner join auth on users.id = auth.user_id where users.id = $1',
        values: [id],
    }
    return db.query(query);
}

User.update = (id, newUser) => {
    const query = {
        text: 'update users set name=$1, email=$2 where id=$3 returning *',
        values: [newUser.name, newUser.email, id],
    }
    return db.query(query);
}

User.delete = (id) => {
    const query = {
        text: 'delete from users where id=$1 returning *',
        values: [id],
    }
    return db.query(query);
}

User.resetPassword = (id, password) => {
    const query = {
        text: 'update users set password=$1 where id=$2 returning *',
        values: [password, id],
    }
    return db.query(query);
}

module.exports = User;