// const http = require("http");

// // require("dotenv").config();

// const PORT = process.env.PORT || 5001

// const server =http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.write(JSON.stringify({message: "Hello Dipesh Welcome to nodejs" }))
//     res.end();
// });

// server.listen(PORT, ()=>{
//     console.log(`checking the port ${PORT}`);
// });

const http = require("http");
const getReq = require("./methods/get-request")
const deleteReq = require("./methods/delete-request")
const putReq = require("./methods/put-request")
const postReq = require("./methods/post-request")

let contacts = require("./data/contact.json")

const PORT = process.env.PORT || 5001

const server = http.createServer((req, res) => {
    req.contacts = contacts
    switch(req.method){
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(
                JSON.stringify({title: "Not Found", message: "Route Not Found "})
             );
            res.end();
    }

    
})

server.listen(PORT, ()=>{
    console.log(`checking the port ${PORT}`);
})