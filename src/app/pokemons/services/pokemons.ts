import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonResponse, PokemonsAPIResponse, simplePageInterface } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class Pokemons {
  private http = inject(HttpClient);

  public simplePage(page: number): Observable<simplePageInterface[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.http
      .get<PokemonsAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map((resp) => {
          const simplePokemons: simplePageInterface[] = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemons;
        }),
      );
  }

  public pokemonLoad(id: string) {
    return this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
