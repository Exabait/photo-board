import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getImageTags(imageUrl: string): Observable<any> {
    const encodedImageUrl = encodeURIComponent(imageUrl);

    return this.httpClient.get(`${environment.immagaApiUrl}tags?image_url=${encodedImageUrl}`, {
      headers: {
        Authorization: `Basic YWNjX2VhODNjMTY5ODE1MTllYTozOGYwZmZhMTdmNDg4ZDA4ZTI4MmE1MTlmMDRiMTcxMw==`
      }
    });
  }
}
