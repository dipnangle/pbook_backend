const requestBodyparse = require("../utils/bodyParser");
const writefile = require("../utils/write-to-file")

module.exports = async (req, res) => {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods",  "GET, POST, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("content-type", "application/json");

    if(req.url === "/api/contacts/adduser" ) {
        try{
            await new Promise(r => setTimeout(r, 3000));
            let body = await requestBodyparse(req);
            body.id = crypto.randomUUID();
            req.contacts.push(body);
            writefile(req.contacts);
            res.writeHead(201, {"Contect-Type": "application.json"});
            res.end(JSON.stringify({title: "done", message: "Contact Saved Succefully"}));
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