"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const server = new server_1.default();
//Rutas de mi aplicacion
server.app.use('/user', usuario_1.default);
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
