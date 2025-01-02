module.exports = (req, res) => {
    let baseurl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseurl);
    let id = req.url.split("/")[3];

    const regexv4 = new RegExp(/^([+-]?\d{1,10})$/);
    let check = regexv4.test(id);
    console.log(check);

    if (!regexv4.test(id)) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "UI is not found" }));

    }

    if (baseurl == "/api/contacts/" && regexv4.test(id)) {

        res.setHeader("content-type", "application/json");

        let filteredContact = req.contacts.filter((contact) => {
            return contact.id == id;
        });

        console.log(filteredContact);

        if (filteredContact.length > 0) {
            res.statusCode == 200;
            res.write(JSON.stringify({ title: "done", message: filteredContact }));
        } else {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ title: "error", message: "Request Contact Not Found" }));
        }

        res.end();
    }
}
