const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

async function list(req, res) {
  await productsService.list()
  res.json({ data })
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
};
