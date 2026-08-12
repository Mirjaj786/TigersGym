import { ChampionModel } from "../Models/Champions.js";

const initialChampions = [
  { name: "Arjun Mehta", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
  { name: "Priya Sharma", month: "February", year: "2025", attendance: "28 / 28 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80" },
  { name: "Rohit Das", month: "March", year: "2025", attendance: "31 / 31 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80" },
  { name: "Sneha Patel", month: "April", year: "2025", attendance: "29 / 30 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80" },
];

// Get all champions with auto-seed fallback
export const getAllChampion = async (req, res) => {
  try {
    let allChampion = await ChampionModel.find().sort({ createdAt: -1 });

    if (allChampion.length === 0) {
      allChampion = await ChampionModel.insertMany(initialChampions);
    }

    return res.status(200).json({
      success: true,
      message: "All Champions retrieved successfully",
      data: allChampion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to get Champions: ${error.message}`,
    });
  }
};

// Create new champion with Cloudinary file upload support
export const createChampion = async (req, res) => {
  try {
    const { name, month, year, attendance, title, prize } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!name || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Champion Name and Image (file upload or URL) are required.",
      });
    }

    const newChampion = new ChampionModel({
      name,
      month: month || "January",
      year: year || "2025",
      attendance: attendance || "30 / 30 Days",
      title: title || "Monthly Champion",
      prize: prize || "Gold Medal",
      image: imageUrl,
    });

    await newChampion.save();

    return res.status(201).json({
      success: true,
      message: "Champion created & saved to Cloudinary!",
      data: newChampion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create Champion: ${error.message}`,
    });
  }
};

// Delete champion
export const deleteChampion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChampionModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Champion record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Champion record deleted successfully!",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete champion: ${error.message}`,
    });
  }
};
