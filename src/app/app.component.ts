import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BoardsService } from './services/boards.service';

import { BoardModel } from './models/board.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'photo-board';

  public boardsList: BoardModel[] = [];
  public board: BoardModel;
  public isImageAdding: boolean;
  public isTagShowed: boolean;

  public isBoardSaved: boolean;

  destroy$: Subject<any> = new Subject();

  constructor(private boardsService: BoardsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
   this.getBoards();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeBoard(board: BoardModel): void {
    this.board = board;
    this.isTagShowed = false;
  }

  saveBoard(): void {
    this.boardsService.updateBoard(this.board)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.isBoardSaved = true;
      setTimeout(() => this.isBoardSaved = false, 3000);
    });
  }

  dismissChanges(): void {
    this.getBoards();
  }

  createCatalog(boardList: BoardModel[]): void {
    this.boardsList = boardList;
  }

  private getBoards(): void {
    this.boardsService.getAllBoards()
      .pipe(takeUntil(this.destroy$))
      .subscribe(boards => {
        debugger
      this.boardsList = boards;
      this.board = this.boardsList[0];
    });
  }
}
