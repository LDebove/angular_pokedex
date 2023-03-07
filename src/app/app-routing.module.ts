import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/pokemons/login/login.component';
import { PokedexComponent } from './core/pokemons/pokedex/pokedex.component';
import { PokemonDetailComponent } from './core/pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './core/pokemons/pokemons.component';
import { SignupComponent } from './core/pokemons/signup/signup.component';
import { TeamComponent } from './core/pokemons/team/team.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: 'pokemon-list', component: PokemonListComponent },
  // { path: 'pokemon-detail/:id', component: PokemonDetailComponent },
  // { path: '**', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonsComponent, children: [
    { path: 'detail/:id', component: PokemonDetailComponent },
    { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'detail/1', pathMatch: 'full' },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/pokemons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
