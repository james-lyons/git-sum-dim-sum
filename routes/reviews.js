const express = require('express');
const router = express.Router();
const ctrls = require('../controllers')

router.get('/', ctrls.reviewsCtrl.indexReviews);
router.post('/', ctrls.reviewsCtrl.createReview)
router.delete('/:id', ctrls.reviewsCtrl.deleteReview)
router.put('/:id', ctrls.reviewsCtrl.editReview)

module.exports = router;