const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hostel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error(err));

const machineSchema = new mongoose.Schema({
    machineId: String,
    status: { type: String, default: 'Unused' },
});

const Machine = mongoose.model('Machine', machineSchema);

const initializeMachines = async () => {
    await Machine.insertMany([
        { machineId: 'machine1' },
        { machineId: 'machine2' },
        { machineId: 'machine3' },
    ]);
    console.log('Machines initialized');
    mongoose.disconnect();
};

initializeMachines();
