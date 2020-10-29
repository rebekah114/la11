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

module.exports=pollObj;