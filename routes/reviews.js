const express = require('express');
const router = express.Router();
const ctrls = require('../controllers')

router.get('/', ctrls.reviewsCtrl.index);
router.get('/:name', ctrls.reviewsCtrl.show);
router.post('/', ctrls.reviewsCtrl.create)
router.delete('/:_id', ctrls.reviewsCtrl.delete)
router.put('/:_id', ctrls.reviewsCtrl.edit)
router.get('/api/v1/reviews', ctrls.reviewsCtrl.index);

module.exports = router;