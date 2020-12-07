import { Component, Input, OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: BoardModel;
  @Input() isTagShowed = false;
  @Input() isImageAdding = false;

  constructor() { }

  ngOnInit(): void {
  }

  setTagsWidth(img: HTMLDivElement): Observable<{[klass: string]: string}> {
    return of({width: `${img.clientWidth}px`});
  }
}
