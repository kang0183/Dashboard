const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use('/api/equip',  require('./routes/equip'));
app.use('/api/inwon',  require('./routes/inwon'));
app.use('/api/global', require('./routes/global'));

app.get('/health', (_req, res) => res.send('ok'));

app.listen(PORT, () => console.log(`Dashboard server running on port ${PORT}`));
