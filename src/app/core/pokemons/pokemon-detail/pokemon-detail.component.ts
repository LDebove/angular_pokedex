import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon?: Pokemon;

  authenticated: boolean = false;

  constructor(private route: ActivatedRoute, private auth: AuthService, private pokedex: PokemonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: () => {
        let id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
        if(!isNaN(id)) {
          this.setPokemonData(id);
        }
      }
    });

    this.authenticated = this.auth.IsAuthenticated();
    this.auth.getAuthenticatedSubject().subscribe({
      next: (authenticated) => {
        this.authenticated = authenticated;
      }
    });
  }

  setPokemonData(id: number): void {
    this.pokemon = undefined;
    let subscription = this.pokedex.getPokemon(id).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        subscription.unsubscribe();
      }
    });
  }

  addPokemonToTeam(): void {
    if(!this.pokemon) return;
    this.pokedex.addPokemonToTeam(this.pokemon.id);
  }
}
