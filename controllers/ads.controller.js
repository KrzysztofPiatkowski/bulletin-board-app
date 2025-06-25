const Post = require('../models/post.model');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('sellerInfo');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAd = async (req, res) => {

  console.log('👉 req.session:', req.session);

  const { title, content, date, photo, price, localization } = req.body;

  if (!title || !content || !date || !price) {
    return res.status(400).json({ message: 'Uzupelnij brakujace pola' });
  }

  const sellerId = req.session.user?.id;

  if (!sellerId) {
    return res.status(401).json({ message: 'Nie masz dostępu' });
  }

  const newPost = new Post({
    title,
    content,
    date,
    photo,
    price,
    localization,
    sellerInfo: sellerId,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ message: 'Nie masz dostepu' })
  }
  
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Ogłoszenie nie istnieje' });
    }

    if (post.sellerInfo.toString() !== req.session.user.id) {
      return res.status(403).json({ message: 'Nie jesteś autorem tego ogłoszenia' });
    }

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: 'Ogłoszenie zostało usunięte' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editAd = async (req, res) => {
  const { id } = req.params;
  const { title, content, date, photo, price, localization } = req.body;

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ message: 'Nie masz dostępu' });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Ogłoszenie nie istnieje' });
    }

    if (post.sellerInfo.toString() !== req.session.user.id) {
      return res.status(403).json({ message: 'Nie jesteś autorem tego ogłoszenia' });
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.date = req.body.date;
    post.photo = req.body.photo;
    post.price = req.body.price;
    post.localization = req.body.localization;

    await post.save();

    res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const searchAds = async (req, res) => {
  const { searchPhrase } = req.params;

  try {
    const regex = new RegExp(searchPhrase, 'i');
    const matchedAds = await Post.find({ title: regex });
    res.json(matchedAds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllPosts,
    getAdById,
    addAd,
    deleteAd,
    editAd,
    searchAds,
};