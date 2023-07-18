import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Empleado } from './interfaces/empleado';
import { EmpleadoService } from './services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';

import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';
import { DataEmpleadoService } from './services/data-empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'NombreCompleto',
    'Departamento',
    'Sueldo',
    'FechaContrato',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<Empleado>([]); //para almacenar la lista

  constructor(
    private _empleadoServicio: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _dataEmpleadoService: DataEmpleadoService
  ) {
    this.dataSource = this._dataEmpleadoService.dataSource;
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  mostrarEmpleados() {
    this._dataEmpleadoService.mostrarEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogoNuevoEmpleado() {
    this.dialog
      .open(DialogAddEditComponent, {
        disableClose: true,
        width: '350px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarEmpleados();
        }
      });
  }

  dialogoEditarEmpleado(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogAddEditComponent, {
        disableClose: true,
        width: '350px',
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarEmpleados();
        }
      });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion),
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      };
  }

  dialogoEliminarEmpleado(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogoDeleteComponent, {
        disableClose: true,
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'eliminar') {
          this.mostrarAlerta('Empleado fue eliminado', 'listo');
          this.mostrarEmpleados();
        }
      });
  }
}
