const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const multer = require('multer');
const {mongoose} = require('mongoose');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiFileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fileStorage = multer({dest:'uploads/'});

const uri = 'mongodb+srv://rkodudula:D1Om6Sl0LS2DWzyD@cluster0.0wbzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports.gemini = gemini;
module.exports.geminiFileManager = geminiFileManager;
module.exports.fileStorage = fileStorage;