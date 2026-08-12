import { GalleryModel } from "../Models/Gallery.js";

const initialPhotos = [
  { title: "Strength Zone", category: "Strength Zone", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
  { title: "Personal Training", category: "Functional Zone", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80" },
  { title: "Cardio Area", category: "Cardio Area", imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80" },
  { title: "Free Weights", category: "Weight Room", imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80" },
  { title: "CrossFit Floor", category: "CrossFit Floor", imageUrl: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80" },
  { title: "Yoga Studio", category: "Yoga Studio", imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80" },
];

// Get all gallery items with auto-seed fallback
export const getAllGallery = async (req, res) => {
  try {
    let galleryItems = await GalleryModel.find().sort({ createdAt: -1 });

    if (galleryItems.length === 0) {
      galleryItems = await GalleryModel.insertMany(initialPhotos);
    }

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

// Add gallery item with Cloudinary file upload support
export const addGalleryItem = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let imageUrl = req.body.imageUrl;

    // If file uploaded via Cloudinary multer
    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and Image (file upload or URL) are required.",
      });
    }

    const newItem = new GalleryModel({
      title,
      category: category || "Gym Tour",
      imageUrl,
      publicId: req.file ? req.file.filename : "",
      description: description || "",
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "Gym photo uploaded & saved successfully to Cloudinary!",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to upload gallery item: ${error.message}`,
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
        message: "Gallery photo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery photo deleted successfully!",
      data: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete photo: ${error.message}`,
    });
  }
};
