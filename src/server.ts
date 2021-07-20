import express from "express";

const app = express();

app.get("/teste", (request, response) => {
    return response.send("ola nlw");
})

app.post("/teste", (request, response) => {
    
})

app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
});