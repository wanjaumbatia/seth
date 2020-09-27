import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private firebase: AngularFireDatabase) { 
    this.regionList = this.firebase.list('regions');
    this.regionList.snapshotChanges().subscribe(
      list=> {
        this.array = list.map(item=> {
          return{
            $key: item.key,
            ...item.payload.val()}
        })
      }
    );
  }

  regionList: AngularFireList<any>;
  array=[];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    code: new FormControl('', Validators.required),    
    region: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      code: '',
      region:''
    });
  }
  insertRegion(region){    
    this.regionList = this.firebase.list('/regions');
    this.regionList.push({
      code: region.code,
      region: region.region
    });
  }

  getRegions(){
     this.regionList = this.firebase.list('regions');
     return this.regionList.snapshotChanges();  
  }
 
  updateRegion(region){
    this.regionList.update(region.$key,{
      code: region.code,
      region: region.region
    })
  }

  deleteRegion($key: string){
    this.regionList.remove($key);
  }

  getRegionName($key){
    if($key==0){
      return '';
    }else{
      return _.find(this.array,(obj)=>{return obj.$key==$key;})['region'];
    }
  }
  populateForm(teamleader){
    this.form.setValue(_.omit(teamleader, 'regionName'))
  }

}
