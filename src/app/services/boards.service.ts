import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BoardModel } from '../models/board.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private httpClient: HttpClient) { }

  getAllBoards(): Observable<any> {
    return this.httpClient.get(`${environment.boardsApiUrl}/boards`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  updateBoard(board: BoardModel): Observable<any> {
    return this.httpClient.post<BoardModel>(`${environment.boardsApiUrl}/boards`, {board});
  }
}
