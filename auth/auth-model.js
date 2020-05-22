const db = require("../database/dbConfig");

module.exports = {
  find,
  findByUsername,
  add,
};

function find() {
  return db("users");
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}

async function add(user) {
    try{
        const [id] = await db('users').insert(user, 'id')
        return findById(id)
    } catch(error) {
        throw error
    }
}