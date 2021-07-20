import express from "express";

const app = express();

app.get("/teste", (request, response) => {
    return response.send("ola nlw");
})

app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
});