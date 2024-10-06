const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const multer = require('multer');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiFileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fileStorage = multer({dest:'uploads/'});

module.exports.gemini = gemini;
module.exports.geminiFileManager = geminiFileManager;
module.exports.fileStorage = fileStorage;