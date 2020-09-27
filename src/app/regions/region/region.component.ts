import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegionsService } from 'src/app/shared/regions.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor( 
    public service: RegionsService,
    private notify: NotificationService,
    public dialogRef: MatDialogRef<RegionComponent>
    ) { }

  onClear(){

  }
  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){        
        this.service.insertRegion(this.service.form.value);
      }else{        
      this.service.updateRegion(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notify.success("::  Saved successfully!")
      this.onClose();
    }else{
      this.notify.error('::  Error: Try again');
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
