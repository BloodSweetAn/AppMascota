import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './component/mascota/mascota.component';
import { CreateEditComponent } from './component/mascota/create-edit/create-edit.component';
import { MascotaListComponent } from './component/mascota/mascota-list/mascota-list.component';

const routes: Routes = [
  {
    path: 'mascotas', component: MascotaComponent, children: [
      {
      path:'nuevo', component: CreateEditComponent
      },
      {
        path:'listado', component: MascotaListComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
