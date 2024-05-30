import { Component, ViewChild } from '@angular/core';
import { Mascota } from '../../../model/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MascotaService } from '../../../service/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrl: './mascota-list.component.scss'
})
export class MascotaListComponent {
  lista: Mascota[] = [];
  displayedColumns = ['idMascota', 'direccion', 'fechaDenacimiento', 'tamanio', 'status'];
  dataSource = new MatTableDataSource<Mascota>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private mascotaService: MascotaService, private router: Router) {
    console.log("CONSTRUCTOR LISTAR")
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("NGONINIT DE LISTAR")
    this.mascotaService.list().subscribe({
      next:(data) =>{
        this.dataSource.data = data;
      }
    });
    this.mascotaService.getList().subscribe(data => {
      this.dataSource.data=data;
    });
    //this.authorService.list().subscribe(data=> this.dataSource = new MatTableDataSource(data));
  }

}
