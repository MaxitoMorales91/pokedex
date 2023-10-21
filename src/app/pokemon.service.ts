import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/pokemon?limit=151`)
      .pipe(map((response: any) => response.results));
  }

  getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`).pipe(
      map((response: any) => {
        const pokemon = {
          id: response.id,
          name: response.name,
          image: response.sprites.front_default,
          types: response.types.map((type: any) => type.type.name),
          stats: response.stats.map((stat: any) => {
            return {
              name: stat.stat.name,
              value: stat.base_stat,
            };
          }),
        };
        return pokemon;
      })
    );
  }
}
