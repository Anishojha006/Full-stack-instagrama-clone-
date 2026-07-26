require("dotenv").config();
const app = require("./src/app.js");
const connecToDataBase = require("./src/config/databse.js");
 
connecToDataBase();

app.listen(3000,()=>{
    console.log("Server is live on 3000 port");
})