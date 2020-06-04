exports.seed = function(knex) {
  return knex('users').insert([      // password
    { username: 'root', password: '$2b$12$SgjLGZuEdpwdxELIMJyX3ulXkJKueLNKLjE./ObXveVYMsvHluM3G' },
    { username: 'emil', password: '$2b$12$pKTY9Q51DH30aIdJ8JEw3en1dovBOXWCroMfuCCoCdnOMnAe3fg4C' }
  ]);
};
