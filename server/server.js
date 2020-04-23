import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/test', (req, res) => {
  res.send("back end being proxied correctly and api route works");
})

// For production, serve the react App if it doesn't match any API routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/build/index.html')));
}

app.listen(PORT, () => { console.log(`App listening on PORT: ${PORT}`) });