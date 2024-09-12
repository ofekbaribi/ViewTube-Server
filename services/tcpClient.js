const net = require('net');

const connectToTCPServer = (video, username) => {
    const client = new net.Socket();

    // Connect to the TCP server
    client.connect(5555, '127.0.0.1', () => {
        console.log('Connected to TCP server');

        // Send the message only once
        const message = username + "," + video;
        client.write(message);
        console.log(`Sent to TCP server: ${message}`);
    });

    // Handle data from the server
    client.on('data', (data) => {
        console.log('Received from TCP server:', data.toString());

        // Close the connection after receiving the response
        client.destroy(); // Ensure the connection is closed after receiving data
    });

    // Handle connection closed
    client.on('close', () => {
        console.log('Connection to TCP server closed');
    });

    // Handle errors
    client.on('error', (err) => {
        console.error('Error:', err);
    });
};

module.exports = { connectToTCPServer };
