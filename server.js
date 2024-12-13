const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hostel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const machineSchema = new mongoose.Schema({
    machineId: String,
    status: { type: String, default: 'Unused' },
});

const Machine = mongoose.model('Machine', machineSchema);

app.get('/machines', async (req, res) => {
    const machines = await Machine.find();
    res.json(machines);
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('updateStatus', async ({ machineId, status }) => {
        await Machine.findOneAndUpdate({ machineId }, { status });
        io.emit('statusUpdated', { machineId, status });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
