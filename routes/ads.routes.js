const express = require('express');
const router = express.Router();

const { getAllPosts, getAdById, addAd, deleteAd, editAd, searchAds } = require('../controllers/ads.controller');

router.get('/ads/search/:searchPhrase', searchAds);

router.get('/ads', getAllPosts);

router.get('/ads/:id', getAdById);

router.post('/ads', addAd);

router.delete('/ads/:id', deleteAd);

router.put('/ads/:id', editAd);

module.exports = router;
