const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'drew',
          password: bcrypt.hashSync('test', 4)
        },
        {
          username: 'latosha',
          password: bcrypt.hashSync('pass', 4)
        },
        {
          username: 'cole',
          password: bcrypt.hashSync('word', 4)
        }
      ]);
    });
};
