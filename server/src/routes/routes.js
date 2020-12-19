var express = require("express");
var router = express.Router();
var translatorController = require('../controllers/translatorController')

router.post('/api/stats', translatorController.stats);
router.post('/api/translate', translatorController.translate);

module.exports = router;