import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionComponent} from '../region/region.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegionsService } from 'src/app/shared/regions.service';
import { MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  constructor(private service: RegionsService, private dialog: MatDialog, private notify: NotificationService, private confirm: DialogService) { }


  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['code', 'region', 'actions' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;


  ngOnInit(): void {
    this.service.getRegions().subscribe(
      list=>{
        let array = list.map(item=>{  
          return{
            $key: item.key,
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
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= '60%';
    this.dialog.open(RegionComponent, dialogConfig)
  }

  onDelete($key){ 
    this.confirm.openDialog('Are you sure you want to delete this region?')
    .afterClosed().subscribe(res=>{
      this.service.deleteRegion($key);
      this.notify.warn("!  Region deleted successfully");
    })
  }
  
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus= true;
    dialogConfig.width= '60%';
    this.dialog.open(RegionComponent, dialogConfig)
  }

}
