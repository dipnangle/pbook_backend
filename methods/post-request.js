const requestBodyparse = require("../utils/bodyParser");
const writefile = require("../utils/write-to-file")

module.exports = async (req, res) => {
    if(req.url === "/api/contacts" ) {
        try{
            let body = await requestBodyparse(req);
            console.log("Request Body: ", body);
            body.id = crypto.randomUUID();
            req.contacts.push(body);
            writefile(req.contacts);
            res.writeHead(201, {"Contect-Type": "application.json"});
            res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({title: "Validation Failed", message: "request body is not valid"}));
        }
            
    } else {
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found Please Enter Valid URL"}));
    }
    
}