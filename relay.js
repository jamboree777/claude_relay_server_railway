const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// MCP URL (여기서 n8n webhook URL을 입력해야 해)
const MCP_URL = 'https://webhook-processor-production-90d8.up.railway.app/mcp/72929d59-009c-4680-84f4-f7a02502f581/sse';

// HTTP 요청을 받아서 n8n에 전달하는 경로 설정
app.use(express.json());

app.post('/relay', async (req, res) => {
  try {
    const response = await axios.post(MCP_URL, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error while sending data to n8n:', error);
    res.status(500).send('Error while sending data to n8n');
  }
});

app.listen(port, () => {
  console.log(`Relay server listening at http://localhost:${port}`);
});
