let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let pollObj={
    question: "Select your favourite component",
    options:[
        {text: "Angular", value:0, count:0}, //push text to replace labels in app component, and count into the pie chart data
        {text: "MongoDB", value:1, count:0},
        {text: "Express.js", value:2, count:0},
        {text: "Golang", value:3, count:0},
        {text: "Python", value:4, count:0},
        {text: "C#", value:5, count:0}
    ],
};


app.use("/", express.static(path.join(__dirname, "dist/chart"))); //check

io.on("connection", socket => { //for each new connection respond with a poll object
    io.emit("newConnection", pollObj);//broadcast obj

    //receives option from client side and increments count
    socket.on('sendPollObj',function(data){
        console.log(data);
        
        let result=pollObj.options[data].count++;
        resultObj={options: result}
        io.emit("receiveIncrementedCounter",resultObj ); //broadcasts incremented counter back to client 
    })
});

server.listen(8080);

