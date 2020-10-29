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
   options=[];

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
    this.socket.on('newConnection', (data)=>{ //receive obj and will broadcast to all clients
     this.pollObj=data;    
      this.pieChartLabels.push(this.pollObj.text);
      this.pieChartData.push(this.pollObj.count);
      this.options.push(this.pollObj.options);
    });
    this.socket.on("receiveIncrementedCounter",(data)=>{//push count that has been incremented to array
      this.pieChartLabels.push(this.pollObj.text);
      this.pieChartData.push(this.pollObj.count);
    })
  }

  sendVote() { //send option selected back to server side to increment count
    console.log(this.selectOpt);

    this.pollOption={option: this.selectOpt.options};//added options
    this.socket.emit("sendBackPollObj", this.pollOption);//send option back to server side
  }
}
