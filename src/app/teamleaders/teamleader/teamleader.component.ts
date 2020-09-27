import { Component, OnInit } from '@angular/core';
import { RegionsService } from 'src/app/shared/regions.service';
import { TeamleaderService } from 'src/app/shared/teamleader.service';
import { NotificationService } from 'src/app/shared/notification.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teamleader',
  templateUrl: './teamleader.component.html',
  styleUrls: ['./teamleader.component.css']
})
export class TeamleaderComponent implements OnInit {

  constructor(
    public service: TeamleaderService, 
    public regions: RegionsService, 
    private notify: NotificationService,
    public dialogRef: MatDialogRef<TeamleaderComponent>
    ) { }

 
  ngOnInit(): void {
    this.service.getTeamleaders();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){        
      this.service.insertTeamleader(this.service.form.value);
      }else{        
      this.service.updateTeamleader(this.service.form.value);
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


}
