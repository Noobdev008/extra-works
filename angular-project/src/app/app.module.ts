import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ChildComponent } from './child/child.component';
import { ReusealbleComponent } from './reusealble/reusealble.component';
import { ParentComponent } from './parent/parent.component';
import { Child2Component } from './child2/child2.component';
import { FormsModule,ReactiveFormsModule,NgForm } from '@angular/forms';
import { UsdInrPipe } from './cutomspipes/usd-inr.pipe';
import { RedElDirective } from './red-el.directive';

@NgModule({
  declarations: [
    AppComponent,

    ChildComponent,
    ReusealbleComponent,
    ParentComponent,
    Child2Component,
    UsdInrPipe,
    RedElDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
