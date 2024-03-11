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
function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

// SQL Query to list price summary
// Selects supplier_id column from products table
// returns min, max, avg values of product_price & groups by supplier_id
function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id")
}

function listTotalWeightByProduct() {
  return knex("products")
    .select(
      "product_sku",
      "product_title",
      knex.raw(
        "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
        )
    )
    .groupBy("product_title", "product_sku");

}

module.exports = {
  read,
  list,
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};