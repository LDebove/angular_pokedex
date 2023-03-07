import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Pokemon[] = [];
  placeholderTeam: void[] = new Array<void>(6);


  constructor(private pokedex: PokemonService) { }

  ngOnInit(): void {
    this.pokedex.getTeam().subscribe({
      next: (teamIds) => {
        this.getTeamFromId(teamIds);
      }
    });
  }

  getTeamFromId(teamIds: number[]): void {
    let observables: Observable<Pokemon>[] = [];
    teamIds.forEach(id => {
      observables.push(this.pokedex.getPokemon(id));
    });
    if(observables.length === 0) this.team = [];
    forkJoin(observables).subscribe({
      next: (team) => {
        this.team = team;
      }
    });
  }

  removePokemon(pokemonIndex: number): void {
    if(this.team.length < 1) return;
    this.pokedex.removePokemonFromTeam(pokemonIndex).then((teamIds) => {
      this.getTeamFromId(teamIds);
    });
  }

  moveLeft(pokemonIndex: number): void {
    if(pokemonIndex < 1) return;
    this.pokedex.moveUp(pokemonIndex).then((teamIds) => {
      this.getTeamFromId(teamIds);
    });
  }

  moveRight(pokemonIndex: number): void {
    if(pokemonIndex >= this.team.length - 1) return;
    this.pokedex.moveDown(pokemonIndex).then((teamIds) => {
      this.getTeamFromId(teamIds);
    });
  }
}
