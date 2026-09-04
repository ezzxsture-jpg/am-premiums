module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.API_KEY;
    const email = req.body?.email?.trim();

    if (!apiKey) {
      return res.status(500).json({
        error: "API_KEY belum diset di Vercel"
      });
    }

    if (!email) {
      return res.status(400).json({
        error: "Email wajib diisi"
      });
    }

    const url = new URL(
      "https://api-yunn.vercel.app/tools/email-prem"
    );

    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("email", email);

    const response = await fetch(url.toString(), {
      method: "GET"
    });

    const text = await response.text();

    try {
      return res
        .status(response.status)
        .json(JSON.parse(text));
    } catch {
      return res
        .status(response.status)
        .send(text);
    }

  } catch (error) {
    return res.status(500).json({
      error: "Gagal menghubungi API",
      message: error.message
    });
  }
};
