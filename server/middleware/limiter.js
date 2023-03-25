const { rateLimit } = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    // message: 'please try later'
})
module.exports = limiter;