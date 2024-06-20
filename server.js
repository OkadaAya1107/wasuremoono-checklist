import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;

app.use(cors({
  origin: '*',

  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const sendLineNotification = async(message) => {
  try {
    await axios.post('https://notify-api.line.me/api/notify',
    `message=${encodeURIComponent(message)}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
      }
     }
    );
    console.log('LINE通知が送信されました');
  } catch (error) {
    console.log('LINE通知の送信に失敗しました', error);
  }
};

// ルートエンドポイントを追加
app.get('/',(req, res) => {
  res.send('サーバーが起動しましたよ');
});

// APIエンドポイント
app.post('/api/notify', async (req, res) => {
  const { message } = req.body;
  await sendLineNotification(message);
  res.json({ success: true });
});

// ポートをリスニングする
app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT}で起動しました。`);
});