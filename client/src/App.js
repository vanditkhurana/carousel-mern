import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [intervalTime, setIntervalTime] = useState(5000);
  const [newImage, setNewImage] = useState({ title: '', description: '', file: null });
  const [newOrder, setNewOrder] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false); 
  const [newIntervalTime, setNewIntervalTime] = useState(intervalTime); 
  const apiUrl = "http://localhost:8080";

  useEffect(() => {
    fetchImages();
    startCarousel(); 
  }, []); 

  useEffect(() => {
    if (intervalId) {
      stopCarousel();
      startCarousel();
    }
  }, [intervalTime]); 

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/images`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleNextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleUpdateOrder = async () => {
    try {
      const imageId = images[currentImageIndex]._id;
      await axios.put(`${apiUrl}/api/images/${imageId}`, { 
        title: images[currentImageIndex].title,
        description: images[currentImageIndex].description,
        order: newOrder
      });
      fetchImages();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const startCarousel = () => {
    const id = setInterval(() => {
      handleNextImage();
    }, intervalTime);
    setIntervalId(id);
  };

  const stopCarousel = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', newImage.file);
      formData.append('title', newImage.title);
      formData.append('description', newImage.description);

      await axios.post(`${apiUrl}/api/images`, formData);
      fetchImages(); 
      setNewImage({ title: '', description: '', file: null });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/images/${id}`);
      fetchImages();
      setCurrentImageIndex(0);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleIntervalChange = (e) => {
    const newTime = parseInt(e.target.value, 10); 
    if (!isNaN(newTime) && newTime > 0) {
      setNewIntervalTime(newTime * 1000); 
    }
  };

  const handleUpdateInterval = () => {
    setIntervalTime(newIntervalTime); 
    stopCarousel(); 
    startCarousel(); 
  };

  return (
    <div className="App">
      <h1>Image Carousel App</h1>

      <div className="upload-section">
        <input
          type="text"
          placeholder="Title"
          value={newImage.title}
          onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newImage.description}
          onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewImage({ ...newImage, file: e.target.files[0] })}
        />
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>

      <div className="image-carousel">
        {images.length > 0 && (
          <div>
            <img
              src={images[currentImageIndex].imagePath}
              alt={images[currentImageIndex].title}
              className="carousel-image"
            />
          </div>
        )} 
        <div className="navigation-buttons">
          <button className="carousel-button" onClick={handlePrevImage}>&lt;</button>
          <button className="carousel-button" onClick={handleNextImage}>&gt;</button>
          <button className="delete-button" onClick={() => handleDeleteImage(images[currentImageIndex]._id)}>
            Delete Image
          </button>
        </div>
        <div className="order-section">
          <input
            type="text"
            placeholder="New Order"
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            onFocus={() => setIsInputFocused(true)} 
            onBlur={() => setIsInputFocused(false)} 
          />
          <button onClick={handleUpdateOrder}>Update Order</button>
        </div>
        <div className="interval-info">
          <input
            type="number"
            placeholder="Interval (seconds)"
            value={newIntervalTime / 1000} 
            onChange={handleIntervalChange}
          />
          <button onClick={handleUpdateInterval}>Update Interval</button>
        </div>
      </div>
    </div>
  );
};

export default App;
