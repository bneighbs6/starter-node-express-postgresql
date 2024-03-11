const knex = require("../db/connection");


function create(supplier) {
    return knex("suppliers")
    .insert(supplier) // Inserts new supplier into suppliers table
    .returning("*") // Returns all columns from newly inserted row
    .then((createdRecords) => createdRecords[0]); // Returns only the one single record created
}

function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
}


function update(updatedSupplier) {
    return knex("suppliers")
        .select("*")
        .where({ supplier_id: updatedSupplier.supplier_id })
        .update(updatedSupplier, "*")
}
module.exports = {
    create,
}