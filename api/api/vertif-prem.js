module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API_KEY belum diset di Vercel Environment Variables"
      });
    }

    const upstream = await fetch(
      "https://api-yunn.vercel.app/tools/vertif-prem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify(req.body || {})
      }
    );

    const text = await upstream.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        raw: text
      };
    }

    return res.status(upstream.status).json(data);

  } catch (err) {
    return res.status(502).json({
      error: "Gagal menghubungi API upstream",
      message: err.message
    });
  }
};
