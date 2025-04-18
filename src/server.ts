import { Server } from "http";
import app from "./app";


const port = 5000

async function startServer() {
    const server: Server = app.listen(port, () => {
        console.log("Ph-healthCare is running on port ", port);
    })
}

startServer()