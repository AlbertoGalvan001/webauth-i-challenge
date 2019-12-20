
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    { username: 'mike', password: "pass1" },
    { username: 'jackson', password: "pass2" },
    { username: 'jen', password: "pass3" },
    { username: 'april', password: "pass4" },
    { username: 'alberto', password: "pass5" },
    { username: 'tristan', password: "pass6" },
  ]);
};
