import { RecordModel } from "../Models/recordHolder.js";

const initialRecords = [
  { member: "Arjun Mehta", recordType: "Deadlift", recordValue: "220 KG", date: "12 Mar 2025", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
  { member: "Vikram Singh", recordType: "Bench Press", recordValue: "160 KG", date: "5 Apr 2025", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80" },
  { member: "Rohit Das", recordType: "Push-Ups", recordValue: "120 Reps", date: "19 Feb 2025", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80" },
  { member: "Priya Sharma", recordType: "Pull-Ups", recordValue: "42 Reps", date: "8 Jan 2025", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80" },
];

// Get all record holders with auto-seed fallback
export const getAllRecords = async (req, res) => {
  try {
    let records = await RecordModel.find().sort({ createdAt: -1 });

    if (records.length === 0) {
      records = await RecordModel.insertMany(initialRecords);
    }

    return res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch records: ${error.message}`,
    });
  }
};

// Add record holder with Cloudinary file upload support
export const addRecord = async (req, res) => {
  try {
    const { member, recordType, recordValue, date } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!member || !recordValue || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Member Name, Record Value, and Image are required.",
      });
    }

    const newRecord = new RecordModel({
      member,
      recordType: recordType || "Deadlift",
      recordValue,
      date: date || new Date().toLocaleDateString("en-IN"),
      image: imageUrl,
    });

    await newRecord.save();

    return res.status(201).json({
      success: true,
      message: "Gym record saved to Cloudinary!",
      data: newRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to add record: ${error.message}`,
    });
  }
};

// Delete record holder
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RecordModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Record holder not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Record holder deleted successfully!",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete record: ${error.message}`,
    });
  }
};
