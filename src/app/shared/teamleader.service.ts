import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class TeamleaderService {

  constructor(private firebase: AngularFireDatabase) { 
    this.teamleaderList = this.firebase.list('teamleaders');
    this.teamleaderList.snapshotChanges().subscribe(
      list=> {
        this.array = list.map(item=> {
          return{
            $key: item.key,
            ...item.payload.val()}
        })
      }
    );
  }
  
  teamleaderList: AngularFireList<any>
  array=[];


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('',  Validators.email),
    phone: new FormControl('',  [Validators.required, Validators.minLength(10)]),
    region: new FormControl(0),
    gender: new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullname: '',
      email:'',
      phone:'',
      region:0,
      gender:'1',
    });
  }

  getTeamleaders(){
    this.teamleaderList = this.firebase.list('teamleaders');
    return this.teamleaderList.snapshotChanges();
  }

  insertTeamleader(teamleader){
    this.teamleaderList.push({
      fullname: teamleader.fullname,
      email: teamleader.email,
      phone: teamleader.phone,
      region: teamleader.region,
      gender: teamleader.gender,
    })
  }

  updateTeamleader(teamleader){
    this.teamleaderList.update(teamleader.$key,
      {
        fullname: teamleader.fullname,
        email: teamleader.email,
        phone: teamleader.phone,
        region: teamleader.region,
        gender: teamleader.gender,
      })
  }
  deleteTeamleader($key: string){
    this.teamleaderList.remove($key);
  }

  populateForm(teamleader){
    this.form.setValue(_.omit(teamleader, 'regionName','leaderName'))
  }

  getTeamlader($key){    
    if($key==0){
      return '';
    }else{
      console.log(this.array)
      return _.find(this.array,(obj)=>{return obj.$key==$key;})['fullname'];
    }
  }
}
