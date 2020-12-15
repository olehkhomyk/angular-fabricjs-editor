import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrls: ['./cropper-modal.component.scss']
})
export class CropperModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
