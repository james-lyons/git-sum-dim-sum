const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrls.reviewsCtrl.indexReviews);
router.post('/', authRequired, ctrls.reviewsCtrl.createReview)
router.delete('/:id', authRequired, ctrls.reviewsCtrl.deleteReview)
router.put('/:id', authRequired, ctrls.reviewsCtrl.editReview)

module.exports = router;