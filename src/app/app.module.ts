import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamleadersComponent } from './teamleaders/teamleaders.component';
import { TeamleaderComponent } from './teamleaders/teamleader/teamleader.component';
import { TeamleaderService } from './shared/teamleader.service';
import { RegionComponent } from './regions/region/region.component';
import { RegionsService } from './shared/regions.service';
import { TeamleaderListComponent } from './teamleaders/teamleader-list/teamleader-list.component';
import { RegionListComponent } from './regions/region-list/region-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { SaleComponent } from './sales/sale/sale.component';
import { SaleListComponent } from './sales/sale-list/sale-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamleadersComponent,
    TeamleaderComponent,
    RegionComponent,
    TeamleaderListComponent,
    RegionListComponent,
    MatConfirmDialogComponent,
    SaleComponent,
    SaleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    TeamleaderService,
    RegionsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TeamleaderComponent, MatConfirmDialogComponent]
})
export class AppModule { }
