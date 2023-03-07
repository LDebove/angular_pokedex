import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon, PagedData } from 'src/app/models/pokemon.model';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private team: number[] = [];

  constructor(private http: HttpClient, private auth: AuthService, private _snackBar: MatSnackBar) {
    this.getTeam().subscribe({
      next: (team) => {
        this.team = team;
      }
    });
    this.auth.getAuthenticatedSubject().subscribe({
      next: (authenticated) => {
        if(authenticated) {
          this.getTeam().subscribe({
            next: (team) => {
              this.team = team;
            }
          });
        }
      }
    });
  }

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
    if(!this.auth.IsAuthenticated()) return of(new Array<number>());
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<number[]>(`${environment.api}/trainers/me/team`, {headers: headers});
  }

  async setTeam(teamIds: number[]): Promise<number[]> {
    let token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    await new Promise<number[]>(resolve => {
      if(teamIds.length > 6) resolve(this.team);
      else {
        this.http.put<void>(`${environment.api}/trainers/me/team`, teamIds, {headers: headers}).subscribe({
          next: () => {
            this.team = teamIds;
            resolve(this.team);
          }
        });
      }
    });
    return this.team;
  }

  async addPokemonToTeam(pokemonId: number): Promise<number[]> {
    let newTeam = this.team.slice();
    await new Promise<number[]>(resolve => {
      if(this.team.length >= 6) {
        this._snackBar.open('Equipe déjà pleine !', 'OK', { duration: 2000 });
        resolve(newTeam);
      } else {
        newTeam.push(pokemonId);
        this.setTeam(newTeam).then((teamIds) => {
          if(this.arrayEquals(newTeam, teamIds)) {
            this._snackBar.open('Pokémon ajouté à l\'équipe !', 'OK', { duration: 2000 });
          }
        });
      }
    });
    return newTeam;
  }

  async removePokemonFromTeam(pokemonIndex: number): Promise<number[]> {
    let newTeam = this.team.slice();
    await new Promise<number[]>(resolve => {
      if(newTeam.length < 1) resolve(newTeam);
      else {
        newTeam.splice(pokemonIndex, 1);
        this.setTeam(newTeam).then((teamIds) => {
          newTeam = teamIds;
          resolve(newTeam);
        });
      }
    });
    return newTeam;
  }

  async moveUp(pokemonIndex: number): Promise<number[]> {
    let newTeam = this.team.slice();
    await new Promise<number[]>(resolve => {
      if(pokemonIndex < 1) resolve(newTeam);
      else {
        let pokemonId = newTeam[pokemonIndex];
        newTeam[pokemonIndex] = newTeam[pokemonIndex - 1];
        newTeam[pokemonIndex - 1] = pokemonId;
        this.setTeam(newTeam).then((teamIds) => {
          newTeam = teamIds;
          resolve(newTeam);
        });
      }
    });
    return newTeam;
  }

  async moveDown(pokemonIndex: number): Promise<number[]> {
    let newTeam = this.team.slice();
    await new Promise<number[]>(resolve => {
      if(pokemonIndex >= this.team.length - 1) resolve(newTeam);
      else {
        let pokemonId = newTeam[pokemonIndex];
        newTeam[pokemonIndex] = newTeam[pokemonIndex + 1];
        newTeam[pokemonIndex + 1] = pokemonId;
        this.setTeam(newTeam).then((teamIds) => {
          newTeam = teamIds;
          resolve(newTeam);
        });
      }
    });
    return newTeam;
  }

  private arrayEquals(array1: number[], array2: number[]): boolean {
    let equals = true;
    array1.forEach((element, index) => {
      if(array2[index] && element !== array2[index]) equals = false;
    });
    return equals;
  }
}
