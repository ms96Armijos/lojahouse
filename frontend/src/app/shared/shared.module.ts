import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { Pagina404Component } from './pagina404/pagina404.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    Pagina404Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    Pagina404Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class ShareModule { }
