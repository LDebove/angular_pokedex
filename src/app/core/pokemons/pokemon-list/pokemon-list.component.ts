import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon, PagedData } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements AfterViewInit {
  pagedData?: PagedData<Pokemon>;
  inputValue: string =  '';
  @ViewChild('list', {read: ElementRef}) list?: ElementRef<HTMLElement>;

  constructor(private pokedex: PokemonService) { }

  ngAfterViewInit(): void {
    this.pokedex.getPokemons(20).subscribe({
      next: (pagedData) => {
        this.pagedData = pagedData;
      }
    });
  }

  onScroll(): void {
    this.pokedex.getPokemons(10, this.pagedData?.data.length, this.inputValue).subscribe({
      next: (pagedData) => {
        if(this.pagedData) {
          this.pagedData.data = this.pagedData.data.concat(pagedData.data);
        }
      }
    });
  }

  // TODO implémenter le infinite scroll pour les input type 'a' qui renvoient énormément de pokémons ==> donc il faut changer le onScroll
  onInput(target: EventTarget): void {
    let inputValue = (<HTMLInputElement>target).value;
    this.inputValue = inputValue;
    this.pokedex.getPokemons(20, undefined, inputValue).subscribe({
      next: (pagedData) => {
        if(this.pagedData) {
          this.pagedData.data = pagedData.data;
          (<HTMLElement>this.list?.nativeElement).firstElementChild?.scrollIntoView();
        }
      }
    });
  }
}
