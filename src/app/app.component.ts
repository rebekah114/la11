import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import * as io from "socket.io-client";
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  socket: SocketIOClient.Socket;
  title="";
  //CHECK
  question="";
  value=0;
  text="";
  pollObj;
   pollOption;
   count=0;
   selectOpt;
   result;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() {
    this.socket=io.connect("http://115.70.113.86:8080");
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  ngOnInit() {
    this.socket.on('newConnection', function(data){ //receive obj and will broadcast to all clients
      // this.pollObj=data;    
      this.Label.push(data.text);
      this.SingelDataSet.push(data.count);
    });
    this.socket.on("receiveIncrementedCounter",function(data){//push incremented count option to arrays
      this.Label.push(data.text);
      this.SingelDataSet.push(data.count);
    })
  }

  sendVote() { //send option selected back to server side to increment count
    console.log(this.selectOpt);
    this.pollOption={option: this.selectOpt};
    this.socket.emit("sendBackPollObj", this.pollOption);//send option back to server side
  }
}
