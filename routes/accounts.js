const express = require('express');
const router = express.Router();
const ctrls = require('../controllers')

router.get('/', ctrls.accountsCtrl.index);
router.get('/:id', ctrls.accountsCtrl.show);
router.delete('/', ctrls.accountsCtrl.deleteUser);

module.exports = router;