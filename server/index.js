import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: { origin: "*" },
});

let connectedUsers = {}; // Diccionario que almacena usuarios conectados (email -> socket ID)

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Registrar al usuario con su correo electrónico
  socket.on("register_user", (email) => {
    connectedUsers[email] = socket.id; // Asociar email con socket ID
    console.log(`Usuario registrado: ${email}`);
    io.emit("update_users", Object.keys(connectedUsers)); // Actualizar lista de usuarios conectados
  });

  // Manejar envío de mensajes
  socket.on("send_message", ({ text, target, sender }) => {
    const targetSocketId = connectedUsers[target]; // Buscar el socket ID del usuario objetivo
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive_message", { text, sender }); // Enviar mensaje al destinatario
      console.log(`Mensaje enviado de ${sender} a ${target}: ${text}`);
    } else {
      socket.emit("error_message", "El usuario no está conectado");
    }   
  });

  // Manejar desconexión         
  socket.on("disconnect", () => {   
    console.log("Usuario desconectado:", socket.id);

    const user = Object.keys(connectedUsers).find(
      (email) => connectedUsers[email] === socket.id
    );

    if (user) {
      delete connectedUsers