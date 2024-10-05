import express from "express";

//
const cors = require('cors');
app.use(cors());
//

const app = express();

app.use(express.json());

app.get('/api/hello', async (req, res) => {
    res.send('Hello from Express');
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
