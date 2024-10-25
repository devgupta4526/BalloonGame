// src/utils/emailUtils.js
import emailjs from "@emailjs/browser";
import { db } from "./firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Function to send email using EmailJS
export const sendEmail = async (email) => {
    try {
        await emailjs.send(serviceId, templateId, {
            email,
            message: "New signup for early access!",
        }, publicKey);
    } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send email.");
    }
};

// Function to store email in Firestore
export const storeEmail = async (email) => {
    try {
        await addDoc(collection(db, "emails"), {
            email,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error("Storing email failed:", error);
        throw new Error("Failed to store email in Firestore.");
    }
};
