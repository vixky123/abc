import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Machine from './components/Machine';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/machines')
            .then((res) => res.json())
            .then((data) => setMachines(data));

        socket.on('statusUpdated', ({ machineId, status }) => {
            setMachines((prev) =>
                prev.map((machine) =>
                    machine.machineId === machineId
                        ? { ...machine, status }
                        : machine
                )
            );
        });
    }, []);

    const updateStatus = (machineId, newStatus) => {
        socket.emit('updateStatus', { machineId, status: newStatus });
    };

    return (
        <div className="App">
            <h1>Disang Hostel - Washing Machines</h1>
            <div className="machine-container">
                {machines.map((machine) => (
                    <Machine
                        key={machine.machineId}
                        machine={machine}
                        updateStatus={updateStatus}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
