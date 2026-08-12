import { ContactModel } from "../Models/Contact.js";

// Submit contact form (Public)
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields.",
      });
    }

    const newContact = new ContactModel({
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully.",
      data: newContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to send message: ${error.message}`,
    });
  }
};

// Get all contact messages (Protected Admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch inquiries: ${error.message}`,
    });
  }
};

// Reply to contact message (Protected Admin)
export const replyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || replyText.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Reply message cannot be empty.",
      });
    }

    const contact = await ContactModel.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found.",
      });
    }

    contact.replyMessage = replyText;
    contact.status = "Replied";
    contact.repliedAt = new Date();

    await contact.save();

    return res.status(200).json({
      success: true,
      message: `Reply saved and marked as sent to ${contact.email}!`,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to reply to inquiry: ${error.message}`,
    });
  }
};

// Delete contact message (Protected Admin)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact inquiry deleted successfully!",
      data: deletedContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete inquiry: ${error.message}`,
    });
  }
};
