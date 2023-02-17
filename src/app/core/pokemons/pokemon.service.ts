import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon, PagedData } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(limit?: number, offset?: number, search?: string): Observable<PagedData<Pokemon>> {
    let params = new HttpParams();
    if(offset) params = params.append('offset', offset);
    if(limit) params = params.append('limit', limit);
    if(search) params = params.append('search', search);
    return this.http.get<PagedData<Pokemon>>('http://pokedex-api.cleverapps.io/pokemons' , { params: params });
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`http://pokedex-api.cleverapps.io/pokemons/${id}`);
  }
}
