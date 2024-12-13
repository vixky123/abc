const socket = io('http://localhost:3000');

const machinesContainer = document.getElementById('machines-container');

// Fetch initial machine statuses
fetch('http://localhost:3000/machines')
    .then((response) => response.json())
    .then((machines) => {
        machines.forEach((machine) => {
            createMachineElement(machine.machineId, machine.status);
        });
    });

// Create machine UI element
function createMachineElement(machineId, status) {
    const machineDiv = document.createElement('div');
    machineDiv.classList.add('machine');
    machineDiv.id = machineId;

    const machineName = document.createElement('h3');
    machineName.textContent = machineId;

    const button = document.createElement('button');
    button.textContent = status === 'Used' ? 'Used' : 'Unused';
    button.classList.add(status === 'Used' ? 'used' : 'unused');

    button.addEventListener('click', () => {
        const newStatus = button.textContent === 'Used' ? 'Unused' : 'Used';
        socket.emit('updateStatus', { machineId, status: newStatus });
    });

    machineDiv.appendChild(machineName);
    machineDiv.appendChild(button);
    machinesContainer.appendChild(machineDiv);
}

// Update UI on status update
socket.on('statusUpdated', ({ machineId, status }) => {
    const machineDiv = document.getElementById(machineId);
    const button = machineDiv.querySelector('button');
    button.textContent = status;
    button.className = status === 'Used' ? 'used' : 'unused';
});
