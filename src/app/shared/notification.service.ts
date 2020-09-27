import { Injectable } from '@angular/core';
import {MatSnackBarConfig, MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snacBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  }

  success(msg){
    this.config['panelClass'] = ['notification' , 'success'];
    this.snacBar.open(msg, '', this.config);
  }

  error(msg){
    this.config['panelClass'] = ['notification' , 'error'];
    this.snacBar.open(msg, '', this.config);
  }

  warn(msg){
    this.config['panelClass'] = ['notification' , 'warn'];
    this.snacBar.open(msg, '', this.config);
  }
}
