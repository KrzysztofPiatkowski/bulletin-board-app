const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('sellerInfo');
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
  const { title, content, date, photo, price, localization } = req.body;

  if (!title || !content || !date || !price) {
    return res.status(400).json({ message: 'Uzupelnij brakujace pola' });
  }

  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: 'Nie masz dostepu' })
  }

  const newPost = new Post({
    title,
    content,
    date,
    photo,
    price,
    localization,
    sellerInfo: req.session.user._id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: 'Nie masz dostepu' })
  }
  
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Ogłoszenie nie istnieje' });
    }

    if (post.sellerInfo.toString() !== req.session.user._id) {
      return res.status(403).json({ message: 'Nie jesteś autorem tego ogłoszenia' });
    }

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: 'Ogłoszenie zostało usunięte' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllPosts,
    getAdById,
    addAd,
    deleteAd,
};