const Image = require('../models/imageModel');

const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort('order');;
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imagePath = req.file.path;
    const startIndex = imagePath.indexOf('uploads');
    if (startIndex !== -1) {
      imagePath = imagePath.substring(startIndex);
      console.log(imagePath);
    } else {
      console.error('Invalid path format');
    }
    const imageCount = await Image.countDocuments();
    const order = imageCount + 1;
    const newImage = new Image({ title, description, imagePath, order });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { order: newOrder } = req.body;
    
    const imageToUpdate = await Image.findById(id);
    if (!imageToUpdate) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const currentOrder = imageToUpdate.order;
    imageToUpdate.order = newOrder;
    await imageToUpdate.save();
    const imagesToUpdate = await Image.find({ _id: { $ne: id } }).sort('order');
    const increment = newOrder < currentOrder ? 1 : -1;

    for (const img of imagesToUpdate) {
      if (newOrder < currentOrder) {
        if (img.order >= newOrder && img.order < currentOrder) {
          img.order += increment;
          await img.save();
        }
      } else {
        if (img.order <= newOrder && img.order > currentOrder) {
          img.order += increment;
          await img.save();
        }
      }
    }
    const updatedImages = await Image.find().sort('order');
    res.json(updatedImages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteImage = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedImage = await Image.findByIdAndDelete(id);
      if (!deletedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.json({ message: 'Image deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

module.exports = {
  getImages,
  addImage,
  updateImage,
  deleteImage
};
