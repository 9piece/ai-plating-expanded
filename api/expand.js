
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/drive/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model_id: "ep-20250604143921-24mx5",
        inputs: { prompt: "请扩写以下食物摆盘提示词：" + prompt }
      })
    });

    const data = await response.json();
    const expanded = data?.output?.text || prompt;
    res.status(200).json({ prompt: expanded });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
