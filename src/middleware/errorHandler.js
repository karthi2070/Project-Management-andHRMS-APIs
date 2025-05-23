module.exports =(err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
}