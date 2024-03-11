const knex = require("../db/connection");


function create(supplier) {
    return knex("suppliers")
    .insert(supplier) // Inserts new supplier into suppliers table
    .returning("*") // Returns all columns from newly inserted row
    .then((createdRecords) => createdRecords[0]); // Returns only the one single record created
}

module.exports = {
    create,
}