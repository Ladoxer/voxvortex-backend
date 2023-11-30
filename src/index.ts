import app from './app';
import { newMessage } from './utils/chatUtils';
import dbConnect from './utils/dbConnection';
import env from 'dotenv';
import { Server } from 'socket.io';
env.config();

const PORT = process.env.PORT;

// db connection
dbConnect();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// socket io
const io = new Server(server, {
  cors:{
    origin: ['http://localhost:4200'],
    methods: ["GET", "POST"]
  }
});

io.on("connection",(socket)=> {
  // console.log("What is socket: ",socket);
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("Room joined:", room);
  });

  socket.on("send_message", async (data) => {
    const {chatId} = data;
    if(data && chatId) {
      socket.to(chatId).emit("receive_message", data);
      await newMessage(data);
    }else{
      console.log("Something went wrong!");
    }
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});