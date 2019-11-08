const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/:id', authRequired, ctrls.accountsCtrl.show);
router.delete('/', authRequired, ctrls.accountsCtrl.deleteUser);

module.exports = router;