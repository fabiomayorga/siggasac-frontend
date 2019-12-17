import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RevenueService, VoucherService } from '../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-revenue-dialogs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RevenueDialogsCreateComponent {
  title = 'Crear';
  icon = 'group';
  color = '#1523e5';
  subtitle = 'Crear Flujo';

  revenueForm = new FormGroup({
    description: new FormControl(
      '',
      [Validators.required],
    ),
    classification: new FormControl(
      '',
      [Validators.required],
    ),
    code: new FormControl(
      '',
      [Validators.required],
    ),
  });

  constructor(
    public revenueService: RevenueService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RevenueDialogsCreateComponent>,
  ) {
  }

  get form() {
    return this.revenueForm.controls;
  }

  create() {
    this.revenueService
      .createRevenue(
        `${this.form.description.value}`,
        `${this.form.classification.value}`,
        `${this.form.code.value}`
      )
      .subscribe(
        response => {
          this._snackBar.open('Flujo creado satisfactoriamente.', 'Aceptar', {
            duration: 3000,
          });

          this.dialogRef.close('Todo creado satisfactoriamente!');
        },
        error => {
          console.error(error);
        },
      );
  }
}
