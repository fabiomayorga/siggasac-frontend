import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';
import { CreateBudgedNoteDialogComponent } from '../dialogs/create/create.component';
import { EditBudgedNoteDialogComponent } from '../dialogs/edit/edit.component';
import { CloseDialogsComponent } from '../dialogs/close/close.component';
// import { EditClientDocumentTypeDialogComponent } from '../dialogs/edit/edit.component';
// import { ClientDocumentTypesService } from '../../../../services';
import { GlobalService, AdminDocumentTypesService, BudgetNotesService } from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalsUser } from '../../../../../assets/data/globals';
@Component({
  selector: 'documents-budged',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class BudgetNotesMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    // private clientDocumentTypesService: ClientDocumentTypesService,
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private global: GlobalsUser,
    private budgetNotesService: BudgetNotesService
  ) {
    console.log(global);
  }

  title = 'Notas presupuestales';
  icon = 'attach_money';
  color = '#f85d60';
  subtitle = 'Listado de Notas Presupuestales de la institución.';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  natures = {};
  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  types = [];
  documentType;


  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // edit(element) {
  //   const dialogRef = this.dialog.open(EditClientDocumentTypeDialogComponent, { disableClose: true, data: element });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.state === 1) {
  //       this._snackBar.open(result.message, 'Aceptar', {
  //         duration: 3000,
  //       });
  //       this.getAll();
  //     }
  //     if (result.state === 0) {
  //       this._snackBar.open(result.message, 'Aceptar', {
  //         duration: 3000,
  //       });
  //     }
  //   });
  // }

  getAll() {
    this.budgetNotesService.getAll()
      .subscribe(data => {
        data = data.map(m => {
          m.amount = m.budgetNotesDetail.reduce((a, b) => +a + +b.value, 0);
          return m;
        });;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.renderRows();
        this.isLoading = false;
        if (data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
  }

  create() {
    const dialogRef = this.dialog.open(CreateBudgedNoteDialogComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  } 

  edit(element) {
    const dialogRef = this.dialog.open(EditBudgedNoteDialogComponent, { disableClose: true, data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  cancel(element) {
    const dialogRef = this.dialog.open(CloseDialogsComponent, { disableClose: true, data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  getAllNatures() {
    // this.globalService.getDocumentNature().subscribe(
    //   data => {
    //     for(const i of data){
    //       this.natures[i.id] = i;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   });
  }

  ngOnInit() {
    this.displayedColumns = ['date', 'concept', 'subconcept', 'amount', 'actions'];
    this.dataSource = new MatTableDataSource<any>(this.types);
    this.mainTablePaginationOptions = [5, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllNatures();
    this.getAll();
  }

}
