const knex = require("../db/connection");
// SQL Query using Knex syntax
function list() {
  return knex("categories").select("*");
}

module.exports = {
  list,
};