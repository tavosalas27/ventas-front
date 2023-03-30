import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cantidad-compra',
  templateUrl: './cantidad-compra.component.html',
  styleUrls: ['./cantidad-compra.component.css']
})
export class CantidadCompraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CantidadCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data)
  }

}
