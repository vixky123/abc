import React from 'react';
import './Machine.css';

function Machine({ machine, updateStatus }) {
    const handleClick = () => {
        const newStatus = machine.status === 'Unused' ? 'Used' : 'Unused';
        updateStatus(machine.machineId, newStatus);
    };

    return (
        <div className={`machine ${machine.status.toLowerCase()}`}>
            <h3>{machine.machineId}</h3>
            <button onClick={handleClick}>
                {machine.status === 'Used' ? 'Oops! In Use' : 'Available'}
            </button>
        </div>
    );
}

export default Machine;
