const suppliersService = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperites = hasProperties("supplier_name", "supplier_email");

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];
// Middleware Functions

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body; 

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
    );

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid fields: ${invalidFields.join(", ")}`,
      });
    }
    next();
}

function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      next({ status: 404, message: `Supplier cannot be found.` });
    })
    .catch(next);
}

function create(req, res, next) {
  suppliersService
    .create(req.body.data)
    .then((data) => res.status(201).json({data}))
    .catch(next);
}

async function update(req, res, next) {
  
}

async function destroy(req, res, next) {
  res.sendStatus(204);
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperites, create],
  update: [hasOnlyValidProperties, hasRequiredProperites, update],
  delete: destroy,
};
