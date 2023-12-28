const { OpenAI } = require("openai");
const { apikeys } = require("./apikey");
const createAsistan = async (req, res) => {
  const mesaj = req.query.mesaj;
  console.log("asistana istek geldi");
  const define =
    "Senin adın Asistanbul. Yani sen bir İstanbul şehir Asistanısın. Senin amacın Kullanıcı ile sohbet ederek onun İstanbul içerisinde aradığı şeye ulaşmasını sağlamak. Kentin önemli noktaları bizim veritabanımızda bulunuyor.Sen Kullanıcıya ne yapmak istediğini, hangi saat aralığında yapmak istediğini ve oraya nasıl ulaşmak istediğini (şahsi araç, toplu taşıma veya yaya) sohbeet esnasında sor. Bu üç bilgiyi öğrendikten sonra sohbeti bitir.Kullanıcıya da iyi dileklerini ileterek sohbeti sonlandır.";
  const apiKey = apikeys.ai;
  const openai = new OpenAI({ apiKey: apiKey });
  const myAssistant = await openai.beta.assistants.create({
    instructions: define,
    name: "Asistanbul",
    tools: [
      {
        type: "function",
        function: {
          name: "getUserInfo",
          description:
            "Kendini adın ile tanıt (asistanbul), Kullanıcıdan lokasyon ilçesini al",
          parameters: {
            type: "object",
            properties: {
              lokasyon: {
                type: "string",
                description: "İstanbulun bir ilçesi, Şişli gibi",
              },
              ulaşım: {
                type: "string",
                description:
                  "yaya,toplu taşıma,şahsi araç seçeneklerinden birisi olmak zorunda",
              },
              saat: {
                type: "number",
                description: "17:00 veya 18:00 gibi herhangibi saat",
              },
            },
            required: ["lokasyon", "ulaşım", "saat"],
          },
        },
      },
    ],
    model: "gpt-3.5-turbo-1106",
  });
  // const myAssistant = await openai.beta.assistants.retrieve(
  //     "asst_0FBJwQOPl5NgdIydgHf9gOjZ"
  // );
  console.log("asistan", myAssistant);

  res.status(200).json(myAssistant);
};
module.exports = {
  createAsistan,
};
