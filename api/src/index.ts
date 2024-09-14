// ...

import express, { Application, Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import appConfig from "./config/appconfig.js";
import { AddressInfo } from "net";
import { dbConnection } from "./config/connect.js";



const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit:'1mb' }));

// cors declaration
app.use(
  cors({
    origin: appConfig.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // access-control-allow-credentials:true
  })
);

app.get("/", (_: Request, res: Response) =>
    res.json({
      message: "Hey, this is a Workflow API ",
      author: "Anish Verma",
      time: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
    })
);

const server = app.listen(appConfig.port || 5000, () => {
    const { port } = server.address() as AddressInfo;
    console.log(`***** Workflow server started at port ${port} *****`);
    dbConnection();
  });