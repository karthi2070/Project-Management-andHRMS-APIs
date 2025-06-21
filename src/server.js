require('dotenv').config();
const app = require('./app');


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`The server is running at http://localhost:${PORT}/api-docs/`));
//  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
 

