import app from './app.js';

const PORT = process.env.BACKEND_PORT || 5010;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
