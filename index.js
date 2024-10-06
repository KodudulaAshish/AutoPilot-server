const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {gemini, geminiFileManager, fileStorage} = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", fileStorage.single('file'), async (req, res) => {
  const finalQuery = {
    history: req.body.history,
    currentQuery: req.body.query
  }

  const finalStringQuery = JSON.stringify(finalQuery);
  let LLMResponse = '';
  
  try{
    if(req.file){
      const uploadResponse = await geminiFileManager.uploadFile(req.file.path, {
        mimeType: "application/pdf",
        displayName: "Gemini 1.5 PDF",
      });

      const result = await gemini.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: finalStringQuery },
      ]);

      LLMResponse = result.response.text();
    }
    else {
      LLMResponse = (await gemini.generateContent(finalStringQuery)).response.text();
    }
  }
  catch (error){
    LLMResponse = `Sorry, response couldn't be generated right now`;
    console.error(error);
  }

  res.json({
    role : 'Gemini', 
    content : LLMResponse});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
