const { OpenAI } = require("openai");
const { apikeys } = require("./apikey");
const asistanbul = async (req, res) => {
  const apiKey = apikeys.ai;
  const openai = new OpenAI({ apiKey: apiKey });
  const asistanID = "asst_AxR9vNwmzpR8CmVthW24uCqC";
  const formData = req.body;

  console.log("gelen veri", formData);
  const threadMessages = await openai.beta.threads.messages.create(
    formData.thereadid,
    {
      role: "user",
      content: formData.mesaj,
    }
  );
  const run = await openai.beta.threads.runs.create(formData.thereadid, {
    assistant_id: asistanID,
  });

  const retrieveRun = async () => {
    let keepRetrievingRun;
    while (run.status !== "completed") {
      keepRetrievingRun = await openai.beta.threads.runs.retrieve(
        (thread_id = formData.thereadid),
        (run_id = run.id)
      );

      console.log(`Run status: ${keepRetrievingRun.status}`);
      if (keepRetrievingRun.status === "completed") {
        const allMessages = await openai.beta.threads.messages.list(
          (thread_id = formData.thereadid)
        );
        res
          .status(200)
          .json({ messages: allMessages.data[0].content[0], finish: false });

        console.log("\n");
        break;
      }
      if (keepRetrievingRun.status === "active") {
        console.log("active!!!!");
        break;
      } else if (keepRetrievingRun.status === "requires_action") {
        console.log(keepRetrievingRun);
        let obje =
          keepRetrievingRun.required_action.submit_tool_outputs.tool_calls[0]
            .function.arguments;
        console.log(obje);
        //res.status(200).json(keepRetrievingRun.required_action.submit_tool_outputs.tool_calls[0].function.arguments);
        const toolCalls =
          keepRetrievingRun.required_action.submit_tool_outputs.tool_calls;
        console.log("tool id", toolCalls);
        const run = await openai.beta.threads.runs.submitToolOutputs(
          thread_id,
          run_id,
          {
            tool_outputs: [
              {
                tool_call_id: toolCalls[0].id,
                output: "true",
              },
            ],
          }
        );
        res
          .status(200)
          .json({
            data: obje,
            message:
              "Size en uygun yerleri harita uzerinde listeledim. Umarim yardimci olabilmisimdir ! :)",
            finish: true,
          });

        return;
        function getUserInfo(a) {
          console.log(a);
          console.log("getUserInfo tetiklendi");
        }
        break;
      }
    }
  };

  // wait for run complete
  await retrieveRun();
  // break kırıldı

  const sendMessages = async function () {
    const allMessages = await openai.beta.threads.messages.list(
      (thread_id = formData.thereadid)
    );
    res
      .status(200)
      .json({ messages: allMessages.data[0].content[0], finish: false });
  };
};
module.exports = {
  asistanbul,
};
