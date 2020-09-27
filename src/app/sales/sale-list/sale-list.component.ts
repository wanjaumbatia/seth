import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegionsService } from 'src/app/shared/regions.service';
import { TeamleaderService } from 'src/app/shared/teamleader.service';
import { MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialog.service';
import { SalesService } from 'src/app/shared/sales.service';
import { SaleComponent } from '../sale/sale.component';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  constructor(
    public service: SalesService,
    private regionService: RegionsService,
    private leaderservice: TeamleaderService,
    private dialog: MatDialog,
    private notify: NotificationService,
    private confirm: DialogService
  ) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['fullname','regionName','leaderName','idnumber','amount', 'date','designation','phone', 'actions']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;

  ngOnInit(): void {
    this.service.getSales().subscribe(
      list=>{
        let array = list.map(item=>{  
          let leaderName = this.leaderservice.getTeamlader(item.payload.val()['teamleader'])
          let regionName = this.regionService.getRegionName(item.payload.val()['region']);        
          return{
            $key: item.key,
            regionName,
            leaderName: leaderName,
            ...item.payload.val() };            
        });        
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) =>{
          return this.displayColumns.some(ele=>{
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        }
      });
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= '60%';
    this.dialog.open(SaleComponent, dialogConfig)
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= '60%';
    this.dialog.open(SaleComponent, dialogConfig)
  }

  onDelete($key){ 
    console.log($key);
    this.confirm.openDialog('Are you sure you want to delete this region?')
    .afterClosed().subscribe(res=>{
      this.service.deleteSale($key);
      this.notify.warn("!  Teamleader deleted successfully");
    })
  }
}
