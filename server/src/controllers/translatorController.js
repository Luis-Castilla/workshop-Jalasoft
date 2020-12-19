var translatorService = require('../services/translatorService')

/** Create */
exports.stats = async (req, res) => {
    await translatorService.stats(req, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

/** Get */
exports.translate = async (req, res) => {
    await translatorService.translate(req, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                body: err
            });
        }
        return res.status(200).json({
            success: true,
            body: result
        });
    });
};

