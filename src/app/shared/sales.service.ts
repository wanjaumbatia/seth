import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { DateService } from './date.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private firebase: AngularFireDatabase, private date: DateService) { }

  salesList: AngularFireList<any>;
  
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    idnumber: new FormControl(''),
    designation: new FormControl('',  Validators.required),
    region: new FormControl(''),
    teamleader: new FormControl(''),
    agent: new FormControl(''),
    amount: new FormControl(''),
    revenue: new FormControl(''),
    phone: new FormControl(''),
    remarks: new FormControl(''),
    type: new FormControl(''),
    date: new FormControl(''),
    loggedOn: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullname: '',
      idnumber:'',
      designation:'',
      region:'',
      teamleader:'',
      agent:'',
      amount:'',
      revenue:'',
      phone:'',
      remarks:'',
      type:'',
      date:'',
      loggedOn:'',
    });
  }

  getSales(){
    this.salesList = this.firebase.list('saccosales');
    return this.salesList.snapshotChanges();
  }

  insertSale(sale){    
    this.salesList = this.firebase.list('/saccosales');
    this.salesList.push({
      fullname: sale.fullname,
      idnumber: sale.idnumber,
      designation: sale.designation,
      region: sale.region,
      teamleader: sale.teamleader,
      agent: sale.agent,
      amount: sale.amount,
      revenue: sale.revenue,
      phone: sale.phone,
      remarks: sale.remarks,
      type: sale.type,
      date: this.date.formatDate(sale.date),
      loggedOn: this.date.formatDate(new Date)
    });
  }

  updateSale(sale){
    this.salesList.update(sale.$key,
      {
        fullname: sale.fullname,
        idnumber: sale.idnumber,
        designation: sale.designation,
        region: sale.region,
        teamleader: sale.teamleader,
        agent: sale.agent,
        amount: sale.amount,
        revenue: sale.revenue,
        phone: sale.phone,
        remarks: sale.remarks,
        type: sale.type,
        date: sale.date,
      }
    )
  }

  deleteSale($key){
    this.salesList.remove($key);
  }

  populateForm(teamleader){
    this.form.setValue(_.omit(teamleader, 'regionName'))
  }
}
