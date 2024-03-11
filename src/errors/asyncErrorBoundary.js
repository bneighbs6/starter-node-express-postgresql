function asyncErrorBoundary(delegate, defaultStaus) {
    return (req, res, next) => {
        Promise.resolve()
            .then(() => delegate(req, res, next))
            .catch((error = {}) => {
                const { status = defaultStaus, message = error } = error; 
                next({
                    status,
                    message,
                });
            });
    };
}
module.exports = asyncErrorBoundary; 