import { Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from '../../../services/bank.service';
import { MatTableDataSource } from '@angular/material/table';
import { school } from '../../schools/components/main/main.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-banks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class BanksMainComponent implements OnInit{
  title = 'Bancos';
  icon = 'apartment';
  color = '#47e52a';
  subtitle = 'Listado de los bancos creados en la plataforma';

  dataSource: MatTableDataSource<Bank>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  constructor(private bankService: BankService) {
  }

  ngOnInit() {
    this.getAll();
    this.displayedColumns = ['name', 'code', 'state' ,'actions'];
    this.mainTablePaginationOptions = [10, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.bankService.getAllBanks()
      .subscribe(banks => {
        console.log(banks)
        this.dataSource = new MatTableDataSource<Bank>(banks);
      });
  }

  createBank() {

  }
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  state: number
}
