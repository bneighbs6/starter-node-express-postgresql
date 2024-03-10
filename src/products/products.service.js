const knex = require("../db/connection");

// SQL Query using Knex syntax
function list() {
  return knex("products").select("*");
}

module.exports = {
  list,
};