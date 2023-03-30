import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-conf-category',
  templateUrl: './conf-category.component.html',
  styleUrls: ['./conf-category.component.css']
})
export class ConfCategoryComponent implements OnInit {
  
  accion:number;
  listaCategorias:any=[];
  listaEstados:any=[];
  formnew: FormGroup;
  formupdate: FormGroup;
  formdelete: FormGroup;

  constructor(private home: HomeService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.home.getEstados().subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay estados para mostrar')
      }else{
        this.listaEstados = response
      }
    })
  }

  cambioAccion(value:number){
    switch (value) {
      case 1:
        this.accion=1
        this.activarNuevo()
        break;

      case 2:
        this.accion=2
        this.activarActualizar()
        break;

      case 3:
        this.accion=3
        this.activarEliminar()
        break;

      default:
        break;
    }
  }

  activarNuevo(){
    this.formnew = this.fb.group({
      category: ['', [Validators.required]],
      state: [0, [Validators.required]]
    })
  }

  nuevaCategoria(){
    let data = {
      "name": this.formnew.value.category,
      "idestado": this.formnew.value.state
    }
    this.home.crearCategoria(data).subscribe((response: any)=>{
      console.log(response)
    })
  }

  activarActualizar(){
    this.consultaCategoria()
    this.formupdate = this.fb.group({
      id: [0, [Validators.required]],
      category: ['', [Validators.required]],
      state: [0, [Validators.required]]
    })
  }

  actualizarCategoria(){
    let data = {
      "name": this.formupdate.value.category,
      "idestado": this.formupdate.value.state
    }
    this.home.actualizarCategoria(this.formupdate.value.id, data).subscribe((response: any)=>{
      console.log(response)
    })
  }

  activarEliminar(){
    this.consultaCategoria()
    this.formdelete = this.fb.group({
      id: [0, [Validators.required]]
    })
  }

  eliminarCategoria(){
    let data = {
      "idestado": 2
    }
    this.home.eliminarCategoria(this.formdelete.value.id, data).subscribe((response: any)=>{
      console.log(response)
    })
  }

  consultaCategoria(){
    this.home.getCategoriasConf().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay categorias para mostrar')
      }else{
        this.listaCategorias = response
        console.log(this.listaCategorias)
      }
    })
  }
}
