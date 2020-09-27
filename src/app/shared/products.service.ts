import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firebase: AngularFireDatabase) { }

  
  productList: AngularFireList<any>;
  array=[];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    product: new FormControl('', Validators.required),
    teamleader: new FormControl('', Validators.required),
    qty: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      product: '',
      teamleader: '',
      qty: '',
      amount: '',
      region:'',
      client: '',
    });
  }product

  insertProductSale(product){    
    this.productList = this.firebase.list('/products');
    this.productList.push({
      product: product.region,
      teamleader: product.teamleader,
      qty: product.qty,
      amount: product.amount,
      region: product.region,
      client: product.client
    });
  }

  getProductSales(){
    this.productList = this.firebase.list('products');
    return this.productList.snapshotChanges();  
 }

 updateProductSale(product){
  this.productList.update(product.$key,{
    product: product.region,
    teamleader: product.teamleader,
    qty: product.qty,
    amount: product.amount,
    region: product.region,
    client: product.client
  })
}

deleteProductSale($key: string){
  this.productList.remove($key);
}
}
