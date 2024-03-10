/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const suppliers = require("../fixtures/suppliers"); // Require seed data in fixtures/suppliers & stores in variable

exports.seed = function(knex) {
  return knex
  .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
  .then(function () {
    return knex("suppliers").insert(suppliers);
  })
};
