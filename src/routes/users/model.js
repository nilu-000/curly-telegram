const fetch = require('../../libs/pool');
const bcrypt = require('bcrypt');

const getAll = async function () {
    const {rows} = await fetch(`SELECT name, email, isAdmin FROM users`);
    return rows;
}

const findOne = async function (email) {
    return await fetch(`SELECT * FROM users WHERE email=$1`, email);
}

const createUser = async function (user) {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return await fetch(`INSERT INTO users (name, email, password, isAdmin) VALUES ($1, $2, $3, $4)`,
    user.name, user.email, hashedPassword, user.isAdmin);
}


module.exports = {
    getAll,
    findOne,
    createUser
}