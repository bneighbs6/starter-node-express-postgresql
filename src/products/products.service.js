const knex = require("../db/connection");

// Creates a knex query
// selects all columns from products table
// where product_id mathces argument passed to read()
// first() returns the first row int he table as an object

function read(productId) {
  return knex("products").select("*").where({ product_id: productId}).first();
}

// SQL Query using Knex syntax
function list() {
  return knex("products").select("*");
}

module.exports = {
  read,
  list,
};