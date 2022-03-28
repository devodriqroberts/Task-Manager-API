

const maintenance_mode = (req, res, next) => {
    res.status(503).send("Service is currently under maintenance. Check back soon!")
}

module.exports = maintenance_mode