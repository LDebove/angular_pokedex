import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon, PagedData } from 'src/app/models/pokemon.model';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPokemons(limit?: number, offset?: number, search?: string): Observable<PagedData<Pokemon>> {
    let params = new HttpParams();
    if(offset) params = params.append('offset', offset);
    if(limit) params = params.append('limit', limit);
    if(search) params = params.append('search', search);
    return this.http.get<PagedData<Pokemon>>(`${environment.api}/pokemons` , { params: params });
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.api}/pokemons/${id}`);
  }

  getTeam(): Observable<number[]> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<number[]>(`${environment.api}/trainers/me/team`, {headers: headers});
  }

  setTeam(teamIds: number[]): Observable<number[]> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<number[]>(`${environment.api}/trainers/me/team`, teamIds, {headers: headers});
  }
}
