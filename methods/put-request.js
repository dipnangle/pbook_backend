const url = require("url");
const requestBodyparse = require("../utils/bodyParser");
const writefile = require("../utils/write-to-file");

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Content-Type", "application/json");

    // Parse URL properly to get ID
    const parsedUrl = url.parse(req.url, true);
    let contact_id = parsedUrl.pathname.split("/").pop(); // Get last part of path

    // If contact_id is in query parameters (?id=1)
    if (parsedUrl.query.id) {
        contact_id = parsedUrl.query.id;
    }

    // Validate ID
    let is_valid_id = /^\d+$/.test(contact_id);
    
    console.log(contact_id);

    if (!is_valid_id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Error", message: "Invalid Contact ID" }));
        return;
    }

    if (req.url.startsWith("/api/contacts/update_contact/") && req.method === "PUT") {
        try {
            let body = await requestBodyparse(req);
            let saved_contacts = req.contacts;

            // Find contact index by ID
            let contact_index_id = saved_contacts.findIndex(contact => contact.id == contact_id);

            if (contact_index_id === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ title: "Error", message: "Contact Not Found" }));
                return;
            }

            // Update contact
            saved_contacts[contact_index_id] = {
                ...saved_contacts[contact_index_id],
                ...body
            };

            writefile(saved_contacts);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Success", message: "Contact Updated Successfully" }));

        } catch (err) {
            console.error("Error:", err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Validation Failed", message: "Invalid Request Body" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Error", message: "Invalid Route" }));
    }
};
