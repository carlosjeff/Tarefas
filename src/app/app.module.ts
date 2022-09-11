import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { FormComponent } from './tarefas/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    DragDropModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-br'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
