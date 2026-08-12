import { GalleryModel } from "../Models/Gallery.js";

// Get all gallery items
export const getAllGallery = async (req, res) => {
  try {
    const galleryItems = await GalleryModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch gallery items: ${error.message}`,
    });
  }
};

// Add gallery item
export const addGalleryItem = async (req, res) => {
  try {
    const { title, category, imageUrl, description } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and Image URL are required.",
      });
    }

    const newItem = new GalleryModel({
      title,
      category: category || "Gym Tour",
      imageUrl,
      description: description || "",
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Gallery item added successfully!",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to add gallery item: ${error.message}`,
    });
  }
};

// Update gallery item
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl, description } = req.body;

    const updatedItem = await GalleryModel.findByIdAndUpdate(
      id,
      { title, category, imageUrl, description },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery item updated successfully!",
      data: updatedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update gallery item: ${error.message}`,
    });
  }
};

// Delete gallery item
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await GalleryModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully!",
      data: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete gallery item: ${error.message}`,
    });
  }
};
