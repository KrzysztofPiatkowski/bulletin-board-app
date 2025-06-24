const express = require('express');
const router = express.Router();

const { getAllPosts, getAdById, addAd, deleteAd } = require('../controllers/ads.controller');

router.get('/ads', getAllPosts);

router.get('/ads/:id', getAdById);

router.post('/ads', addAd);

router.delete('/ads/:id', deleteAd);

module.exports = router;
