import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegionsService } from 'src/app/shared/regions.service';
import { TeamleaderService } from 'src/app/shared/teamleader.service';
import { MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { TeamleaderComponent } from '../teamleader/teamleader.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-teamleader-list',
  templateUrl: './teamleader-list.component.html',
  styleUrls: ['./teamleader-list.component.css']
})
export class TeamleaderListComponent implements OnInit {

  constructor( private service: TeamleaderService, 
    private regionService: RegionsService,
     private dialog: MatDialog,
     private notify: NotificationService,
     private confirm: DialogService
     ) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['fullname', 'email', 'phone', 'regionName', 'gender', 'actions' ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;

  ngOnInit(): void {
    this.service.getTeamleaders().subscribe(
      list=>{
        let array = list.map(item=>{  
          let regionName = this.regionService.getRegionName(item.payload.val()['region']);        
          return{
            $key: item.key,
            regionName,
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
    this.dialog.open(TeamleaderComponent, dialogConfig)
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
    this.dialog.open(TeamleaderComponent, dialogConfig)
  }

  onDelete($key){ 
    console.log($key);
    this.confirm.openDialog('Are you sure you want to delete this region?')
    .afterClosed().subscribe(res=>{
      this.service.deleteTeamleader($key);
      this.notify.warn("!  Teamleader deleted successfully");
    })
  }
}
