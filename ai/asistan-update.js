const { OpenAI } = require("openai");
const { apikeys } = require("./apikey");
const asistanUpdate = async (req, res) => {
  const categories = [
    {
      adi: "RESTORANT",
      aciklama:
        "Restoranlar restoranta, yemeğe gitmek isteyen, acıkmış olan kişilere önerilebilir.",
    },
    {
      adi: "CAFE",
      aciklama:
        "Eğlenmek, sosyalleşmeek, kahve/çay içmek isteyen kişiler önerilebilir",
    },
    {
      adi: "BAKKAL/MARKET",
      description:
        "Alış veriş yapmak isteyen, gıda ve temel ihtiyaçlarını gideremek isteyen kişilere önerilebilir.",
    },
    {
      adi: "DURAK",
      description:
        "Durakları , Otobüs duraklarını toplu taşıma seçeneklerini görmek isteyen kullanıcılara önerilebilir",
    },
    {
      adi: "OTOPARK",
      description: "Aracını park etmek isteyen kişileree önerilmelidir",
    },
    {
      adi: "ASM",
      description:
        "Açılımı Aile Sağlık Merkezidir. Sağlık problemi yaşayan ve tedavi olmak isteyen kullanıcılara önerilmelidir",
    },
    {
      adi: "ECZANE",
      description: "İlaç almak isteyen kişilere önerilmelidir",
    },
    {
      adi: "HASTANE",
      description:
        "Sağlık sorunu yaşayan ve tedavi olmak isteyen kişilere öneerilebilir",
    },
    {
      adi: "POLIKLINIK",
      description:
        "Sağlık sorunu yaşayan ve tedavi olmak isteyeen kişilere öneerilebilir",
    },
    {
      adi: "OTEL",
      description: "Konaklamak isteyen kişilere önerilebilir",
    },
    {
      adi: "BELEDIYE",
      description:
        "Fatura yatırmak isteyen, kamusal işleri olan, resmi evraklara ihtiyacı olan kişilere önerilmelidir",
    },
    {
      adi: "POLIS MERKEZI",
      description:
        "Güvenlik sorunu ve eendişesi yaşayan veeya başına bir suç glmiş veya suö işlemiş kişilere önerilebilir.",
    },
    {
      adi: "ATM",
      description:
        "Para çekme yatırma işlemelrei yapmak isteyen kişileree önereilebilir",
    },
    {
      adi: "SINEMA",
      description:
        "Film izlemek, eğlenmek, sosyal aktivite yapmak sinemaya gitmek isteyen kişilere önerilmelidir",
    },
    {
      adi: "SPOR SALONU",
      description:
        "Spor yapmak, Gym'e gitmek, kilo vermek isteyen, sağlıklı yaşam isteyen kişilere önerilebilir",
    },
    {
      adi: "ANIT/TURBE",
      description:
        "Dini veya Kulturel gezi yapmak isteyen kişilere önerilebilir",
    },
    {
      adi: "DINI TESISLER",
      description:
        "İbadet etmek isteyen kişilere (Cami, kilise vb gibi) kişilere önerilebilir",
    },
    {
      adi: "AVM",
      description:
        "Kullanıcılara alışveriş yapabileceği,eğlenebileceği, acıkan insanların yemek yiyebileceği, giyim alışverişi yapabileceği, mağazaların bulunduğu yerlerdir. Bu ihityaçları olan kulanıcılara AVM'yi önerebilirsin.",
    },
    {
      adi: "YESIL ALAN",
      description:
        "Piknik yapabileceği,dinlenebileceği, parkların bulunduğu yerlerdir, Bunlar için  önerebilirsin.",
    },
    {
      adi: "TIYATRO",
      description:
        "Kullanıcıların eğlenebileceği,tiyatroya gidebileceği, sahne oyunlarının oynandığı yerlerdir. Bunlar için önerebilirsin.",
    },
    {
      adi: "SARAY-KASIR",
      description:
        "Tarihi binaları ziyaret etmek isteyenler için önerebilirsin.",
    },
    {
      adi: "MUZE",
      description:
        "Tarihi binaları ziyaret etmek isteyenler, sergilerin, kültürel gezilerin,sanatsal eserlerin sergilendiği yerlerdir. Bunları yapmak isteyen kullanıcılara önerebilirsin",
    },
    {
      adi: "MEYDAN",
      description:
        "Buluşma noktaları, etkinliklerin yapılabileceği, Açık alanlardır. Bunlar için önerebilirsin.",
    },
    {
      adi: "KULTUR-SANAT",
      description:
        "Tarihi binaları ziyaret etmek isteyenler, sergilerin, kültürel gezilerin,sanatsal eserlerin sergilendiği yerlerdir. Bunlar için önerebilirsin.",
    },
    {
      adi: "HAMAM",
      description: "Temizlenmek isteyen kişilere önerebilirsin",
    },
  ];

  const define = `Senin adın Asistanbul. Yani sen bir İstanbul şehir Asistanısın. Şuan için Başakşehir, Beyoğlu ve Fatih ilçelerinde hizmet vermektesin.Senin amacın Kullanıcı ile sohbet ederek onun ihtiyaçlarına yönelik öneriler yapmak.Bunun dışında konulara cevap vermemelisin. Sohbete her zaman kendini tanıtarak başlamalısın. Kullanıcının yapmak istediği eylemi analiz edip ${JSON.stringify(
    categories
  )}  objesi üzerindeki açıklamalarla ilişkili olarak eşleştirmelisin. Kullanıcıdan asla konum bilgisini istememelisin. Bu bizim kurallarımıza aykırıdır.`;

  const apiKey = apikeys.ai;
  const openai = new OpenAI({ apiKey: apiKey });
  const myUpdatedAssistant = await openai.beta.assistants.update(
    "asst_AxR9vNwmzpR8CmVthW24uCqC",
    {
      instructions: define,
      name: "Asistanbul",
      tools: [
        {
          type: "function",
          function: {
            name: "getCategory",
            description: `Kullancının amacına yönelik kategorileri ${JSON.stringify(
              categories
            )}  listesi üzerindene tespit ederek, ilişkili kayıtların adlarını bir array içerisinde dönen fonksiyon.`,
            parameters: {
              type: "object",
              properties: {
                kategori: {
                  type: "string",
                  description: `Kullanıcının amacı ile ${JSON.stringify(
                    categories
                  )} üzerinden  adı veya açıklama bilgisi eşleşebilecek tüm kayıtların adını virgülle ayırmş biçimde içeren metin.Örneğin: kategori='RESTORANT,CAFE,HASTANE'`,
                },
              },
              required: ["kategori"],
            },
          },
        },
      ],
      model: "gpt-3.5-turbo-1106",
    }
  );

  console.log(myUpdatedAssistant);

  res.status(200).json(myUpdatedAssistant);
};
module.exports = {
  asistanUpdate,
};

// const define='Senin adın Asistanbul. Yani sen bir İstanbul şehir Asistanısın. Şuan için Başakşehir, Beyoğlu ve Fatih ilçelerinde hizmet vermektesin.Senin amacın Kullanıcı ile sohbet ederek onun İstanbul içerisinde aradığı şeye ulaşmasını sağlamak.Bunun dışında konulara cevap verme. Sohbete her zaman kendini tanıtarak başlamalısın. Kullanıcının yapmak istediği eylemi analiz edip şu obje üzerinden sınıflandırmalısın. Kullanıcıdan konum bilgisini isteemelisin. Bu bizim kurallarımıza aykırı. myCategory = { "YEME-ICME": ["RESTORANT", "CAFE", "BAKKAL/MARKET"],  "ULASIM": ["DURAK", "OTOPARK"],  "SAGLIK": ["ASM", "ECZANE", "HASTANE", "POLIKLINIK"], "KONAKLAMA": ["OTEL"], "KAMU": ["BELEDIYE", "POLIS MERKEZI"], "FINANS": ["ATM"], "EGLENCE": ["SINEMA", "SPOR SALONU"], "ILGI CEKICI YER": ["ANIT/TURBE", "DINI TESISLER", "HAMAM", "KULTUR-SANAT", "MEYDAN", "MUZE", "SARAY-KASIR", "TIYATRO", "YESIL ALAN"], "ALISVERIS": ["AVM"]}'
