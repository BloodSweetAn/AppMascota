import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../../model/mascota';
import { MascotaService } from '../../../service/mascota.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss'
})
export class CreateEditComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  mascota: Mascota = new Mascota();
  mensaje: string = "";
  //var currentDate = new Date();
// to add 4 days to current date currentDate.addDays(4);
  Todate = new Date();
  constructor(private mascotaService: MascotaService, private router: Router, private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        idMascota: new FormControl('', [Validators.required , Validators.pattern('^[0-9]+$')]),
        direccion: new FormControl('', [Validators.required , Validators.minLength(5)]),
        fechaDenacimiento: new FormControl(),
        tamanio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        status: new FormControl('', [Validators.required])
      }
    );
  }

  aceptar(){
    this.mascota.idMascota = this.form.value['idMascota'];
    this.mascota.direccion = this.form.value['direccion'];
    this.mascota.fechaDenacimiento = this.form.value['fechaDenacimiento'];
    this.mascota.tamanio = this.form.value['tamanio'];
    this.mascota.status = this.form.value['status'];

    const maxDate = new Date;
    maxDate.setDate(this.Todate.getDate()+1);
    maxDate.setHours(0,0,0,0);

    const invalidDate = this.form.get('FechaDenacimiento')?.value >= maxDate;

    if(this.form.valid || invalidDate){

      if(invalidDate){
        this.form.get('FechaDenacimiento')?.setErrors({invalidDate:true});
      }else{
        this.mascotaService.create(this.mascota).subscribe((data)=>{
          this.mascotaService.list().subscribe(data => {
            this.mascotaService.setList(data);//enviando la lista al suscriptor
          })
        });
        this.router.navigate(['mascotas']);
      }
    }else{
      this.mensaje="Agregue campos omitidos";
    }
  
  }

}


