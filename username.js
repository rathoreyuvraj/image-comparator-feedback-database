app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Username Input Popup</title>
            <style>
                .popup {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 20px;
                    background-color: #f0f0f0;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
            </style>
        </head>
        <body>

        <div class="popup">
            <h2>Enter Your Username</h2>
            <form id="usernameForm">
                <input type="text" id="usernameInput" placeholder="Username" required>
                <br><br>
                <button type="submit">Submit</button>
            </form>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Handle form submission
                document.getElementById('usernameForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const username = document.getElementById('usernameInput').value;

                    // Send username to the server
                    fetch('/store-username', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: username })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message); // Show feedback from server
                        // Optionally, you can close the popup or redirect the user
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
            });
        </script>

        </body>
        </html>
    `);
});

// Endpoint to handle username submission
app.post('/store-username', (req, res) => {
    const { username } = req.body;
    // Here you can store the username as needed (e.g., in a database)
    console.log('Username entered:', username); // Optionally log on the server side
    res.json({ message: 'Username stored successfully!' });
});
