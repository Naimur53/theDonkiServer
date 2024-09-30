"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const socketServer = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(socketServer);
io.on('connection', (socket) => {
    // console.log('A user connected');
    // // Handle join room event
    // socket.on('join-room', async (groupId: string | string[]) => {
    //   // Join the specified chat group room
    //   if (groupId) {
    //     socket.join(groupId);
    //     console.log(`User joined room ${groupId}`);
    //   }
    //   // Fetch and send previous messages in the room
    // });
    // // Handle new message event
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // socket.on('send-message', async (message: Message) => {
    //   // Save the message to the database
    //   // Send the new message to all users in the chat group room
    //   try {
    //     await MessageValidation.createValidation.parseAsync({
    //       body: message,
    //     });
    //     io.to(message.chatGroupId).emit('receive-message', message);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    // // Handle join room event
    // socket.on('leave-room', async (groupId: string) => {
    //   // Join the specified chat group room
    //   if (groupId) {
    //     socket.leave(groupId);
    //     console.log(`User leave room ${groupId}`);
    //   }
    //   // Fetch and send previous messages in the room
    // });
    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
exports.default = socketServer;
