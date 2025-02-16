module.exports = (req, res) => {
    let baseurl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];

    // cehcking VALIDATION
    const regexv4 = new RegExp(/^([+-]?\d{1,10})$/);
    let check = regexv4.test(id);

    console.log("received here");
    
    if(req.url === "/api/contacts") {
        res.statusCode == 200;
        // res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(req.contacts));
        res.end();
    } else if (baseurl == "/api/contacts" && !regexv4.test(id)){
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed", message: "Contact ID Not Found"}));
    } else if (baseurl == "/api/contacts/" && regexv4.test(id)){
        
        let filteredContact = req.contacts.filter((contact) => {
            return contact.id == id;
        });

        if(filteredContact.length > 0) {
            res.statusCode == 200;
            res.write(JSON.stringify({title: "done", message: filteredContact}));
        }else{
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({title: "error", message: "Request Contact Not Found"}));
        }
        
        res.end();
    } else{
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found Please Enter Valid URL"}));
    }
}
