import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon?: Pokemon;

  constructor(private route: ActivatedRoute, private pokedex: PokemonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: () => {
        let id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
        if(!isNaN(id)) {
          this.setPokemonData(id);
        }
      }
    });
  }

  setPokemonData(id: number): void {
    let subscription = this.pokedex.getPokemon(id).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.playAudio();
        subscription.unsubscribe();
      }
    });
  }

  playAudio(): void {
    const audio = new Audio();
  }
}
