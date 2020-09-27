import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProductsService } from 'src/app/shared/products.service';
import { RegionsService } from 'src/app/shared/regions.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public service: ProductsService, private notify: NotificationService, 
    public regions: RegionsService, ) { }

  ngOnInit(): void {
  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){        
      this.service.insertProductSale(this.service.form.value);
      }else{        
      this.service.updateProductSale(this.service.form.value);
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
    //this.service.form.reset();
    //this.service.initializeFormGroup();
   // this.dialogRef.close();
  }

}
