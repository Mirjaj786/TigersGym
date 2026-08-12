import { ContactModel } from "../Models/Contact.js";
import { sendEmail } from "../Utils/sendEmail.js";

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

// Reply to contact message & send direct email via Nodemailer
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

    // Construct professional HTML email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #334155;">
        <div style="text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #f59e0b; margin: 0; font-size: 24px; font-weight: bold;">TIGERS GYM</h2>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Fitness & Training Center</p>
        </div>
        
        <p style="font-size: 15px; color: #f8fafc; line-height: 1.6;">Dear <strong>${contact.name}</strong>,</p>
        
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          Thank you for reaching out to Tigers Gym. Below is our response to your inquiry regarding <strong>"${contact.subject}"</strong>.
        </p>

        <div style="background-color: #1e293b; border-left: 4px solid #f59e0b; padding: 14px 16px; margin: 16px 0; border-radius: 6px;">
          <p style="font-size: 12px; color: #f59e0b; font-weight: bold; margin: 0 0 6px 0; text-transform: uppercase;">Management Response:</p>
          <p style="font-size: 14px; color: #ffffff; margin: 0; line-height: 1.6; white-space: pre-wrap;">${replyText}</p>
        </div>

        <div style="background-color: #182234; border: 1px solid #334155; padding: 12px 14px; margin: 16px 0; border-radius: 6px;">
          <p style="font-size: 11px; color: #94a3b8; font-weight: bold; margin: 0 0 4px 0;">YOUR ORIGINAL INQUIRY:</p>
          <p style="font-size: 13px; color: #94a3b8; margin: 0; font-style: italic;">"${contact.message}"</p>
        </div>

        <div style="border-top: 1px solid #334155; padding-top: 16px; margin-top: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 4px 0; font-weight: bold; color: #f8fafc;">Tigers Gym Team</p>
          <p style="margin: 0;">Email: www.tigersgym@gmail.com | Malda, West Bengal</p>
        </div>
      </div>
    `;

    // Send email directly to user's email address
    await sendEmail({
      to: contact.email,
      subject: `Re: ${contact.subject} - Tigers Gym`,
      html: emailHtml,
    });

    // Update database status
    contact.replyMessage = replyText;
    contact.status = "Replied";
    contact.repliedAt = new Date();

    await contact.save();

    return res.status(200).json({
      success: true,
      message: `Reply email successfully sent to ${contact.email}!`,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to send reply email: ${error.message}`,
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
