import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Mascota } from '../model/mascota';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const baseUrl = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url = `${baseUrl}`
  private listaCambio = new Subject<Mascota[]>()
  constructor(private http: HttpClient) { }

  list(): Observable<any>{
    console.log(this.url);
    return this.http.get<Mascota[]> (this.url + "/mascotas");
  }

  create(mascota: Mascota){
    return this.http.post(this.url + "/mascota", mascota);
  }

  setList(listaNueva: Mascota[]){
    this.listaCambio.next(listaNueva);
  }
    
  getList(){
    return this.listaCambio.asObservable();
  }
}
