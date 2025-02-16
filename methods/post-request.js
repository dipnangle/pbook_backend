const requestBodyparse = require("../utils/bodyParser");
const writefile = require("../utils/write-to-file")

module.exports = async (req, res) => {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("content-type", "application/json");

    // filling json saved contact in variable for further use

    if(req.url === "/api/contacts/add_contact" ) {
        
        try{
            await new Promise(r => setTimeout(r, 3000));
            let body = await requestBodyparse(req);
            let saved_contacts = req.contacts;

            // now get the last id of saved account so we will transfer that id to contact
            last_contact_id = Object(saved_contacts)[Object.keys(saved_contacts).length-1];
            if(!last_contact_id){
                body.id = 1;
            }else{
                body.id = last_contact_id.id + 1;
            }

            body.uuid = crypto.randomUUID();
            req.contacts.push(body);
            writefile(req.contacts);
            res.writeHead(201, {"Contect-Type": "application.json"});
            res.end(JSON.stringify({title: "done", message: "Contact Saved Succefully", lastid: last_contact_id.id}));

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