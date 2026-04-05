const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Включаем CORS для всех запросов — это важно для работы с GitHub Pages!
app.use(cors());
app.use(express.json());

// Логируем все запросы для отладки
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// --- Эндпоинт: получение статуса роботов ---
app.get('/robot_status', (req, res) => {
  console.log('Headers received:', req.headers);
  
  // Успешный ответ (статус 200)
  res.status(200).json({
    message_id: 1001,
    date: new Date().toISOString(),
    data: [
      {
        line_id: 1,
        line_status_code: 3,
        robots_data: [
          { robot_id: 11, robot_status_code: 4 },
          { robot_id: 12, robot_status_code: 2 }
        ]
      },
      {
        line_id: 2,
        line_status_code: 1,
        robots_data: null
      }
    ]
  });
});

// Можно добавить другие эндпоинты, если нужно

// Обработчик для несуществующих маршрутов (404)
app.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: `Endpoint ${req.originalUrl} не существует`
  });
});

// Запускаем сервер
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log(`CORS enabled for all origins`);
});