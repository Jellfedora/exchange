const moment = require("moment");
const axios = require("axios");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// ajout de socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  transport: ["websocket"],
  cors: {
    origin: "*",
  },
});

const agent = new https.Agent({
  rejectUnauthorized: false,
});

moment.locale("fr");
https.globalAgent.options.rejectUnauthorized = false;

let connectedUsers = [];
let rooms = [];

io.on("connection", (socket) => {
  // Save Users infos when connect and remove on disconnect
  socket.on("identifier", function (connectedUser) {
    // console.log(connectedUser.firstname + " s'est connecté");
    connectedUsers.push(connectedUser);

    // attempt to clean up

    socket.on("disconnect", function () {
      // console.log(connectedUser.firstname + " s'est déconnecté");

      var removeUser = connectedUsers.findIndex(
        (user) => user.firstname === connectedUser.firstname
      );

      connectedUsers.splice(removeUser, 1);
      io.emit("connected-user", {
        connectedUsers,
      });
      // console.log(connectedUsers);
    });

    io.emit("connected-user", {
      connectedUsers,
    });
    // console.log(connectedUsers);
  });

  // Echange de message privé entre deux utilisateurs
  socket.on("private-message", (msg) => {
    console.log(msg);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    let time = new Date().toLocaleDateString("fr-FR", options);
    io.emit(msg.roomName, {
      time: time,
      // user: msg.user,
      user: msg.userId,
      message: msg.message,
    });

    // axios
    //   .get("https://127.0.0.1:8000/api/get_all_users", { httpsAgent: agent })
    //   .then((response) => {
    //     console.log(response.data.data.users);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // room-5_13
    let room = msg.roomName;

    let splitRoom = room.split("room-");
    let usersId = splitRoom[1];
    let splitUsersId = usersId.split("_");

    let userOne = splitUsersId[0];
    let userTwo = splitUsersId[1];

    console.log(msg.user);
    axios
      .post("https://exchange-api.hopto.org/api/conversation/create", {
        roomName: msg.roomName,
        // users: [userOne, userTwo],
        userOne: parseInt(userOne),
        userTwo: parseInt(userTwo),
        time: time,
        userId: parseInt(msg.userId),
        message: msg.message,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Quand un texte est saisit
  socket.on("user-writes", (msg) => {
    // console.log(msg);
    io.emit("user-writes", {
      time: msg,
    });
  });

  // Echange de message privé
  // Quand l'utilisateur demande
  // on lui crée une salle privé pour deux
  socket.on("get-room", function (infos) {
    if (infos.userId && infos.recipientId) {
      let roomName;
      let smallerId = Math.min(
        parseInt(infos.userId),
        parseInt(infos.recipientId)
      );
      console.log(smallerId);
      if (smallerId === infos.userId) {
        roomName = "room-" + infos.userId + "_" + infos.recipientId;
      } else {
        roomName = "room-" + infos.recipientId + "_" + infos.userId;
      }
      console.log("room name =  " + roomName);
      // On vérifie si il y a deja une chambre de créé à ce nom
      // TODO
      rooms.forEach((element) => {
        if (element !== roomName) {
          rooms.push(roomName);
        }
      });

      socket.join(roomName);

      // io.in(roomName).emit(roomName, "You are in room no. " + roomName);
    }
  });
});

// server.listen(3001, "0.0.0.0");

server.listen(3001, "0.0.0.0", () => {
  console.log("Websocket Server is started on " + 3001);
});
