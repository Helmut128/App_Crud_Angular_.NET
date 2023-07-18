import { Injectable } from '@angular/core';
import { EmpleadoService } from './empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class DataEmpleadoService {
  dataSource = new MatTableDataSource<Empleado>([]); //para almacenar la lista

  constructor(private _empleadoServicio: EmpleadoService) {}

  //contol + K + C --Comentar
  //Control + K + U --> Descomentar
  mostrarEmpleados() {
    this._empleadoServicio.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (e) => {},
      complete: () => {},
    });
  }
}
