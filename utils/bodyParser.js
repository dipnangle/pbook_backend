module.exports = (request) => {
    
    return new Promise((resolve, reject) =>{
        try{
            let body = "";
            request.on("data", chunk =>{
                body+= chunk
            })
            request.on("end", () =>{
                try {
                    resolve(JSON.parse(body));
                } catch (parseError) {
                    reject (new Eroor("Invalid JSON"));
                    console.log(err);
                }
            })
        }catch (err){
            console.log(err);
            reject(err);
        }
    })
    
}