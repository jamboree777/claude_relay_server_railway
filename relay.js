const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/mcp-relay", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  console.log("🔌 Claude connected via SSE");

  const interval = setInterval(() => {
    const dummyData = { message: "Hello from Claude!" };

    res.write(`data: ${JSON.stringify(dummyData)}\n\n`);

    axios.post("https://webhook-processor-production-90d8.up.railway.app/mcp/72929d59-009c-4680-84f4-f7a02502f581/sse", dummyData)
      .then(() => console.log("✅ Sent to n8n"))
      .catch((err) => console.error("❌ Error:", err.message));
  }, 5000);

  req.on("close", () => {
    console.log("❌ Disconnected");
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server on http://localhost:3000/mcp-relay`);
});
