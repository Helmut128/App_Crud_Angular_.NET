import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private endpoint: string = enviroment.endPoint;
  private apiUrl: string = this.endpoint + 'departamento/';

  constructor(private http: HttpClient) {}

  getList(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}lista`);
  }
}
