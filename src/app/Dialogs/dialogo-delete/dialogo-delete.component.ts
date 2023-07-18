import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Empleado } from 'src/app/interfaces/empleado';
import { DataEmpleadoService } from 'src/app/services/data-empleado.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css'],
})
export class DialogoDeleteComponent {
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    private _empleadoService: EmpleadoService,
    private _snackBar: MatSnackBar,
    private _dataServiceEmpleado: DataEmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {}

  ngOnInit(): void {}

  confirmar_Eliminar() {
    if (this.dataEmpleado) {
      // console.log(this.dataEmpleado);
      this._empleadoService.delete(this.dataEmpleado.idEmpleado).subscribe({
        next: (data) => {
          this._dataServiceEmpleado.mostrarEmpleados();
          this.mostrarAlerta('Empleado fue eliminado', 'Listo');
          this.dialogoReferencia.close('Eliminar');
        },
        error: (e) => {
          this.mostrarAlerta(
            `No se pudo Eliminar empleado ${this.dataEmpleado.nombreCompleto} `,
            'Error'
          );
        },
      });
    }
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion),
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      };
  }
}
