import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TagService } from './services/tag.service';
import { BoardsService } from './services/boards.service';

import { BoardModel } from './models/board.model';

import { OverviewDialogComponent } from './components/overview-dialog/overview-dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'photo-board';

  public boardsList: BoardModel[] = [];
  public board: BoardModel;
  public imageInput = new FormControl('');
  public boardOptions = new FormControl('');
  public isTagShowed = false;

  constructor(private boardsService: BoardsService,
              private tagService: TagService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
   this.getBoards();
  }

  addImage(): void {
    this.tagService.getImageTags(this.imageInput.value).subscribe(res => {
      this.board.photos.push({
        link: this.imageInput.value,
        tags: res.result.tags.slice(0, 10),
        dateCreated: Date.now()
      });
      this.imageInput.setValue('');
      console.log(this.board);
    });
  }

  showTags(): void {
    this.isTagShowed = true;
  }

  changeBoard(): void {
    this.boardsList.map(board => {
      if (board.title === this.boardOptions.value){
        this.board = board;
      }
    });
    this.isTagShowed = false;
  }

  saveBoard(): void {
    this.boardsService.updateBoard(this.board).subscribe(value => console.log(value));
  }

  dismissChanges(): void {
    this.getBoards();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OverviewDialogComponent, {
      width: '250px',
      data: { boardTitle: this.board.title }
    });

    dialogRef.afterClosed().subscribe(title => {
      if (!title) { return; }
      if (this.isNewBoard(title)) {
        this.board = {
          title,
          photos: []
        };
        this.boardsList.push(this.board);
      } else {
        this.boardsList.map(board => {
          if (board.title === title) {
            this.board = board;
          }
        });
      }
    });
  }

  private isNewBoard(title): boolean {
    for (const board of this.boardsList) {
      if (board.title === title) {
        return false;
      }
    }
    return true;
  }

  private getBoards(): void {
    this.boardsService.getAllBoards().subscribe(boards => {
      this.boardsList = boards;
      this.board = this.boardsList[0];
    });
  }

}
