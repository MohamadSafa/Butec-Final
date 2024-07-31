import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SectionEntitiesService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.baseUrl,
    }),
  };

  constructor(private http: HttpClient) {}

  AddSectionEntity(sectionId: any, entityId: any): Observable<any> {
    return this.http
      .post(
        this.baseUrl +
          'Sections/AddSectionEntity?sectionId=' +
          sectionId +
          '&entityId=' +
          entityId,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': this.baseUrl,
          }),
        }
      )
      .pipe(map((data) => data));
  }

  RemoveSectionEntity(sectionEntityId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'Sections/RemoveSectionEntity', {
      params: new HttpParams({
        fromString: 'sectionEntityId=' + sectionEntityId,
      }),
    });
  }

  GetSectionEntityBySectionId(sectionId: any, languageId: any) {
    return this.http.get(
      this.baseUrl + 'Sections/GetSectionEntityBySectionId',
      {
        params: new HttpParams({
          fromString: 'sectionId=' + sectionId + '&languageId=' + languageId,
        }),
      }
    );
  }
}
