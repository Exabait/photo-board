import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BoardsService } from './services/boards.service';
import { TagService } from './services/tag.service';

import { AppComponent } from './app.component';
import { OverviewDialogComponent } from './components/overview-dialog/overview-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    OverviewDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [BoardsService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
