import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FabricjsEditorModule } from 'projects/angular-editor-fabric-js/src/public-api';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CropperModalComponent } from './cropper-modal/cropper-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CropperModalComponent
  ],
  imports: [
    BrowserModule,
    FabricjsEditorModule,
    FormsModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    CropperModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
