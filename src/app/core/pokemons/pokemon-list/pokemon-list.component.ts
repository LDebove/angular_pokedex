import { AfterViewInit, Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon, PagedData } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements AfterViewInit {
  pagedData?: PagedData<Pokemon>;

  constructor(private pokedex: PokemonService) { }

  ngAfterViewInit(): void {
    this.pokedex.getPokemons(20).subscribe({
      next: (pagedData) => {
        this.pagedData = pagedData;
      }
    });
  }

  onScroll(): void {
    this.pokedex.getPokemons(10, this.pagedData?.data.length).subscribe({
      next: (pagedData) => {
        if(this.pagedData) {
          this.pagedData.data = this.pagedData.data.concat(pagedData.data);
        }
      }
    });
  }
}
