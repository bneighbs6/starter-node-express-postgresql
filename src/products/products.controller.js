const productsService = require("./products.service");

// Validation Middleware

async function productExists(req, res) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product; 
    return next();
  }
  next({status:404, message: `Product cannot be found`})

}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

function list(req, res, next) {
  productsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
