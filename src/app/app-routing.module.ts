import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './core/pokemons/pokedex/pokedex.component';
import { PokemonDetailComponent } from './core/pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './core/pokemons/pokemon-list/pokemon-list.component';
import { PokemonsComponent } from './core/pokemons/pokemons.component';

const routes: Routes = [
  // { path: 'pokemon-list', component: PokemonListComponent },
  // { path: 'pokemon-detail/:id', component: PokemonDetailComponent },
  // { path: '**', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: 'pokedex/:id', component: PokedexComponent },
  { path: '**', redirectTo: '/pokedex/1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
