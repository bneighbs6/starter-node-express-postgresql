const knex = require("../db/connection");

// Creates a knex query
// selects all columns from products table
// where product_id mathces argument passed to read()
// first() returns the first row int he table as an object

// SQL Query using knex syntax
function read(productId) {
  return knex("products").select("*").where({ product_id: productId}).first();
}

// SQL Query using Knex syntax
function list() {
  return knex("products").select("*");
}

// SQL Query to list out of stock products 
function listOutOfStock() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

module.exports = {
  read,
  list,
};