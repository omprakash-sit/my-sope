require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, (err) => {
    if (!err) {
        console.log("Server is running on port %s", process.env.PORT);
    } else {
        console.log("Error in node server setup...");
    }
});
