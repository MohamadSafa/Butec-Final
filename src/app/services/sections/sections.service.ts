import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': this.baseUrl,
    }),
  };

  constructor(private http: HttpClient) {}

  AddSection(obj: any): Observable<any> {
    return this.http
      .post(this.baseUrl + 'Sections/AddSection', obj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': this.baseUrl,
        }),
      })
      .pipe(map((data) => data));
  }

  RemoveSection(sectionId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'Sections/RemoveSection', {
      params: new HttpParams({ fromString: 'sectionId=' + sectionId }),
    });
  }

  GetSectionById(sectionId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'Sections/GetSectionById', {
      params: new HttpParams({ fromString: 'sectionId=' + sectionId }),
    });
  }

  GetSections(languageId: any): Observable<any> {
    // return this.http.get<any>(
    //   this.baseUrl + 'Sections/GetSections',
    //   this.httpOptions
    // );
    return this.http.get(this.baseUrl + 'Sections/GetSections', {
      params: new HttpParams({ fromString: 'languageId=' + languageId }),
    });
  }

  EditSection(obj: any): Observable<any> {
    return this.http
      .post(this.baseUrl + 'Sections/EditSection', obj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': this.baseUrl,
        }),
      })
      .pipe(map((data) => data));
  }
}
