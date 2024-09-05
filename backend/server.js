const app = require("./app");

const PORT = process.env.PORT || 8000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
