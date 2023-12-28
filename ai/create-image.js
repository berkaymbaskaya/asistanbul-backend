const { OpenAI } = require("openai");
// Görüntü hakkında bilgi oluşturma fonksiyonu
const generateImageInfo = async (message) => {
  try {
    const apiKey = "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";
    const openai = new OpenAI({ apiKey: apiKey });

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "sen istanbuldaki önemli yerler için bilgi dönen bir robotsun.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "text" },
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Hata:", error);
    return "Bilgi bulunamadı.";
  }
};

const createImage = async (req, res) => {
  try {
    console.log(req.query.mesaj);
    const apiKey = "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";
    const openai = new OpenAI({ apiKey: apiKey });
    const formData = req.query;

    // Kullanıcı mesajından görüntüyü oluştur
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: formData.mesaj,
      n: 1,
      size: "1024x1024",
    });

    // Görüntü oluşturulduysa
    if (imageResponse && imageResponse.data && imageResponse.data.length > 0) {
      const generatedImage = imageResponse.data[0].url;
      // Görüntü hakkında bilgi oluştur
      const imageInfo = await generateImageInfo(formData.mesaj);

      res.status(200).json({
        image: generatedImage,
        info: imageInfo,
      });
    } else {
      res.status(500).json({ error: "Görüntü oluşturulamadı." });
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Beklenmeyen bir hata oluştu." });
  }
};

module.exports = {
  createImage,
};
