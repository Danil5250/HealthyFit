module.exports = (res, statusHttpCode, error) =>{
    res.status(statusHttpCode).json({
        success: false,
        message : error.message ? error.message : error
    });
}