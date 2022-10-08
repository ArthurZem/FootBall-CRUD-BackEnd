import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';
import routes from "./routes";

class App {
public express: express.Application;

public constructor() {
this.express = express();
this.express.use(cors());

this.middlewares();
this.initMongoose();
this.connectDatabase();
this.routes();
}

private initMongoose() {
mongoose.set('runValidators', true);
}

private middlewares(): void {
this.express = express();
this.express.use(express.json());
this.express.use(cors());
}

private routes() {
this.express.use(routes);
}

private connectDatabase(): void {
const uri = "mongodb+srv://Arthur:12@progwebcluster.ksn3duz.mongodb.net/test";
mongoose.connect(uri, {
serverApi: ServerApiVersion.v1
}).then(() => {
console.log('Conectado ao mongodb');
}).catch((error) => {
console.log(error);
});
}

public listen(port: number): void {
this.express.listen(port, () => {
console.log(`Aplicação iniciada na porta : ${port}`);
});
}
}

export default new App();
