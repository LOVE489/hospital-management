const errorHandler = (err, req, res, next) => {
    // If the status code is 200 but it's an error, default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Handle Mongoose duplicate key errors (like duplicate email)
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate field value entered. Email must be unique.'
        });
    }

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;