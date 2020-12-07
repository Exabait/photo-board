import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  boardTitle: string;
}

@Component({
  selector: 'app-overview-dialog',
  templateUrl: './overview-dialog.component.html',
  styleUrls: ['./overview-dialog.component.scss']
})
export class OverviewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OverviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
