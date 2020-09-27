import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegionsService } from 'src/app/shared/regions.service';
import { SalesService } from 'src/app/shared/sales.service';
import { TeamleaderService } from 'src/app/shared/teamleader.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(
    public service: SalesService,    
    public regions: RegionsService, 
    public teamleader: TeamleaderService,
    private notify: NotificationService,
    public dialogRef: MatDialogRef<SaleComponent>
    ) { }


    types = [
      {id: 1, value: 'Single Application'},
      {id: 2, value: 'Loyalty Customer'},
      {id: 3, value: 'Chama'}
    ]

  ngOnInit(): void {
  }

  
  onSubmit(){
    if(this.service.form.valid){
      console.log()
      if(!this.service.form.get('$key').value){        
      this.service.insertSale(this.service.form.value);
      }else{        
      this.service.insertSale(this.service.form.value);
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

  onClear(){
    
  }
}
