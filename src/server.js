const app = require('../app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`API running in http://localhost:${process.env.port}`);
});
