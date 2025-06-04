export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 0bce1539-21ee-486d-acdd-95ecc559e984"
      },
      body: JSON.stringify({
        model: "ep-20250603194600-lxnmn",
        messages: [{ role: "user", content: [{ type: "text", text: `请扩写以下关于菜名与风格的描述，使其更丰富、具体、有画面感：${prompt}` }] }]
      })
    });

    const data = await response.json();
    const expanded = data.choices?.[0]?.message?.content || prompt;
    res.status(200).json({ expanded });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
