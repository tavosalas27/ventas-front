import { Component, OnInit } from '@angular/core';
import { ListadoCompraService } from './listado-compra.service';

@Component({
  selector: 'app-listado-compra',
  templateUrl: './listado-compra.component.html',
  styleUrls: ['./listado-compra.component.css']
})
export class ListadoCompraComponent implements OnInit {
  
  user:any;
  listaCompras:any=[];

  constructor(private compra: ListadoCompraService){}
  
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.compra.getCompras(this.user).subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay comprar hechas por este usuario')
      }else{
        this.listaCompras = response
        console.log(this.listaCompras)
      }
    })
  }

}
