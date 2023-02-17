import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './pokemons.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule
  ]
})
export class PokemonsModule { }