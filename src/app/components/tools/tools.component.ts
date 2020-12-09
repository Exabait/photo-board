import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BoardModel } from '../../models/board.model';
import { TagService } from '../../services/tag.service';
import { OverviewDialogComponent } from '../overview-dialog/overview-dialog.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnDestroy {

  @Input() boardsList: BoardModel[];
  @Output() boardsListChanges: EventEmitter<BoardModel[]> = new EventEmitter<BoardModel[]>();

  @Input() board: BoardModel;
  @Output() boardChanges: EventEmitter<BoardModel> = new EventEmitter<BoardModel>();

  @Input() isTagShowed: boolean;
  @Output() isTagShowedChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() isImageAdding: EventEmitter<boolean> = new EventEmitter<boolean>();

  public imageInput = new FormControl('');
  public boardOptions = new FormControl('');

  destroy$: Subject<any> = new Subject();

  constructor(private tagService: TagService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showTags(): void {
    this.isTagShowedChanges.emit(!this.isTagShowed);
  }

  changeBoard(): void {
    this.board = this.boardsList.find(board => board.title === this.boardOptions.value);
    this.boardChanges.emit(this.board);
  }

  addImage(): void {
    this.isImageAdding.emit(true);
    this.tagService.getImageTags(this.imageInput.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
          this.board.photos.push({
            link: this.imageInput.value,
            tags: res.result.tags.slice(0, 10),
            dateCreated: Date.now()
          });
          this.imageInput.setValue('');
          this.isImageAdding.emit(false);
        },
        () => this.isImageAdding.emit(false));
  }

  createCatalog(): void {
    const dialogRef = this.dialog.open(OverviewDialogComponent, {
      width: '250px',
      data: {title: !!this.board ?  this.board.title : 'New Catalog Title'}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    )
      .subscribe((title: string) => {
        debugger;
        if (!this.checkIsNewBoard(title)) {
          this.addNewBoard(title);
        } else {
          const existedBoard = this.boardsList.find(board => board.title === title);
          this.boardChanges.emit(existedBoard);
          debugger;
        }
        this.isTagShowedChanges.emit(false);
      });
  }

  private checkIsNewBoard(title: string): boolean {
    debugger;
    return this.boardsList.length === 0 ? !!this.boardsList.find(board => board.title === title) : false;
  }

  private addNewBoard(title: string): void {
    this.board = {
      title,
      photos: []
    };
    this.boardsList.push(this.board);
    this.boardsListChanges.emit(this.boardsList);
    this.boardChanges.emit(this.board);
    debugger;
  }

}
