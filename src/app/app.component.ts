import { Component, OnInit } from '@angular/core';
import { TagService } from './services/tag.service';
import { BoardsService } from './services/boards.service';
import { FormControl } from '@angular/forms';
import { BoardModel } from './models/board.model';

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

  constructor(private boardsService: BoardsService,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.boardsService.getAllBoards().subscribe(boards => {
      this.boardsList = boards;
      this.board = this.boardsList[0];
    });
  }


}
