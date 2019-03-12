import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {} //kada stavis u argument konstruktora tipa private pa ime podatka , odmah ti se to cuva kao properti klase

  ngOnInit() {
    this.startOrResumeTimer();
  }
  startOrResumeTimer() {
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer); //stops the timer immediately
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    //Kada pokrenes dialog.open biras na koju ces komponentu : StopTrainingComponent i drugi opcioni argument je data objekat koji hoces da preneses u tu komponentu

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
