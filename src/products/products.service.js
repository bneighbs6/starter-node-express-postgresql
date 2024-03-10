const knex = require("../db/connection");

// SQL Query using Knex syntax
function list() {
    knex("categories").select("*");
}

module.exports = {
    list,
}