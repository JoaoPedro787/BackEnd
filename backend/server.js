const app = require('./app');

require('dotenv').config()

PORT = process.env.PORT;

app.listen(process.env.PORT,()=>console.log(`Server rodando na porta ${PORT}`));