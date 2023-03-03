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
  token: string = '';

  constructor(private pokedex: PokemonService) { }

  ngOnInit(): void {
    this.pokedex.getTeam(this.token).subscribe({
      next: (teamIds) => {
        let observables: Observable<Pokemon>[] = [];
        teamIds.forEach(id => {
          observables.push(this.pokedex.getPokemon(id));
        });
        forkJoin(observables).subscribe({
          next: (team) => {
            this.team = team;
          }
        });
      }
    });
  }


}
