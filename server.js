let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

const pollObj= require('pollObj');


app.use("/", express.static(path.join(__dirname, "dist/chart"))); //check

io.on("connection", socket => { //for each new connection respond with a poll object
    io.emit("newConnection", pollObj);//broadcast obj

    //receives option from client side and increments count
    socket.on('sendPollObj',function(data){
        console.log(data);
        //somhow extract count match to the value sent and increment the count
        // let increment=data.count+1;//suppossed to increment count
        pollObj[data]=pollObj.option.count++;
        let resultObj={option: increment};
        io.emit("receiveIncrementedCounter",resultObj ); //sends back result..CHECK or should I have a new event?
    })
});

server.listen(8080);

