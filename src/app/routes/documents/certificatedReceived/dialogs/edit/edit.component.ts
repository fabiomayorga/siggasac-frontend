import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDocumentTypesService, BudgetNotesService, RevenueService, AvaliabilityCertificatesService ,ThirdsService, BudgetAccountsService, ProjectsService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService, PUCService } from '../../../../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'create-budged-account',
  templateUrl: 'edit.html',
})

export class EditCDPDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<EditCDPDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService,
    private budgetAccountsService: BudgetAccountsService,
    private revenueService: RevenueService,
    private projectsService: ProjectsService,
    private thirdsService: ThirdsService,
    private budgetNotesService: BudgetNotesService,
    private pUCService: PUCService,
    private avaliabilityCertificatesService: AvaliabilityCertificatesService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  title = 'Edición';
  icon = 'add';
  color = color;
  subtitle = 'Editando Nota Presupuestal:';

  budgedAccounts;

  dinfilter = {};

  editFormGroup = new FormGroup({
    budget: new FormControl({ value: this.incomingdata.budgetId, disabled: true }, [Validators.required]),
    concept: new FormControl({ value: this.incomingdata.concept, disabled: true }, [Validators.required, ]),
    detail: new FormControl({ value: this.incomingdata.detail, disabled: true }, [Validators.required, ]),
    certificateDate: new FormControl({ value: new Date(this.incomingdata.certificateDate), disabled: true }, [Validators.required]),
    observations: new FormControl({ value: this.incomingdata.observations, disabled: true }, [Validators.required]),
  });

  mainTablePaginationOptions = [5, 10, 15, 50];

  documentType;
  projects;
  campus;
  natures = {};
  revenues;
  revenuetypes;
  subconcepts;
  thirds;
  budgedAccountsOriginal;

  evaluate;

  accounts = [
  ];

  totalAmount = 0;

  dataSource = new MatTableDataSource<any>(this.accounts);
  displayedColumns: string[] = ['accountid', 'campusid', 'revenueid', 'proyectid', 'amount', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

  getAmount() {
    this.totalAmount = this.accounts.reduce((a, b) => +a + +b.amount, 0);
  }

  addAccount(element) {
    this.accounts.push({
      accountid: element ? element.budgetAccountId : 0,
      campusid: element ? element.campusId : 0,
      revenueid: element ? element.revenueId : 0,
      projectid: element ? element.projectId : 0,
      amount: element ? element.value : 0,
      filterb: '', filterc: '', filterr: '', filterp: ''
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.evaluate = this.accounts.filter(a => {
      return a.accountid != 0 && a.campusid != 0 && a.revenueid != 0 && a.value != 0 && a.projectid != 0
    });
  } 

  eval(){
    console.log(this.editFormGroup)
    this.evaluate = this.accounts.filter(a => {
      return a.accountid != 0 && a.campusid != 0 && a.revenueid != 0 && a.amount != 0 && a.amount != null && a.projectid != 0
    });
  }

  deletere(i) {
    this.accounts.splice(i, 1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.getAmount();
    this.eval();
  }

  getBudgets() {
    this.globalService.getBudgets().subscribe(data => {
      this.revenuetypes = data;
    });
  }

  getSubconcepts() {
    this.globalService.getSubconcepts(this.editFormGroup.value.conceptId).subscribe(data => {
      this.subconcepts = data;
    });
  }

  getThirds() {
    this.thirdsService.getAll().subscribe(
      data => {
        this.thirds = data;
      });
  }

  filterSelect(text, filter, type) {

    if (type === 1) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 2) {
      return filter.name.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 3) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 4) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }
  }

  getAccounts() {
    this.budgetAccountsService.getAll().subscribe(data => {
      this.budgedAccounts = data.filter(m => m.code.charAt(0) == 2)
    });
  }

  getRevenues() {
    this.revenueService.getAllRevenues().subscribe(data => {
      this.revenues = data;
    });
  }

  getProyects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(data => {
      this.campus = data;
    });
  }


  edit() {
    let tmp = [];
    for (const i of this.accounts) {
      tmp.push({
        value: i.amount,
        budgetAccountId: i.accountid,
        campusId: i.campusid,
        revenueId: i.revenueid,
        projectId: i.projectid,
      });
    }

    const obj = {
      certificateDate: moment(this.incomingdata.noteDate).format('YYYY-MM-DD'),
      concept: this.incomingdata.concept,
      budgetId: this.incomingdata.budget,
      detail: this.incomingdata.detail,
      observations: this.incomingdata.observations,
      availabilityCertificatesDetail : tmp,
    };

    this.avaliabilityCertificatesService.edit(obj, this.incomingdata.id).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Acción ejecutada satisfactoriamente.' });
      },
      error => {
        console.log(error);
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de nuevo más tarde.'
        });
      });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllSubsidiaries();
    this.getAccounts();
    this.getRevenues();
    this.getProyects();
    this.getBudgets();
    this.getThirds();

    for (const detail of this.incomingdata.availabilityCerticateDetail) {
      this.addAccount(detail);
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
