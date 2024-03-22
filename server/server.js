import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

// const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// app.use('/uploads', express.static(__dirname + '/uploads'));


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);


/** start server */
connect().then(() => {
    try {
        const server = app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });

        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
              origin: "http://localhost:3000",
            },
          });
          
        io.on("connection", (socket) => {
            console.log("Connected to socket.io");
            socket.on("setup", (userData) => {
              socket.join(userData._id);
              socket.emit("connected");
            });
          
            socket.on("join chat", (room) => {
              socket.join(room);
              console.log("User Joined Room: " + room);
            });
            socket.on("typing", (room) => socket.in(room).emit("typing"));
            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
          
            socket.on("new message", (newMessageRecieved) => {
              var chat = newMessageRecieved.chat;
          
              if (!chat.users) return console.log("chat.users not defined");
          
              chat.users.forEach((user) => {
                if (user._id == newMessageRecieved.sender._id) return;
          
                socket.in(user._id).emit("message recieved", newMessageRecieved);
              });
            });
          
            socket.off("setup", () => {
              console.log("USER DISCONNECTED");
              socket.leave(userData._id);
            });
          });

    } catch (error) {
        console.log('Cannot connect to the server' + error)
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

