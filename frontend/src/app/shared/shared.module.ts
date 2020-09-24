import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { Pagina404Component } from './pagina404/pagina404.component';
import { Pagina403Component } from './pagina403/pagina403.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    Pagina404Component,
    Pagina403Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    Pagina403Component
  ],
  exports: [
    Pagina404Component,
    Pagina403Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class ShareModule { }
