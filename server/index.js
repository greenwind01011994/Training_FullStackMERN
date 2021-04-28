const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('HELLO WOLD'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server sterted on port ${PORT}`));