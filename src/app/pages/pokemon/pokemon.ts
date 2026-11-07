import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonResponse } from '../../pokemons/interface/pokemonsResponse';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Pokemon implements OnInit {
  private pokemonsService = inject(Pokemons);
  public pokemons = signal<PokemonResponse | null>(null);
  public route = inject(ActivatedRoute);
  public title = inject(Title);
  public meta = inject(Meta);

  ngOnInit(): void {
    const pokemonID = this.route.snapshot.paramMap.get('id');
    if (!pokemonID) return;
    this.pokemonsService
      .pokemonLoad(pokemonID)
      .pipe(
        tap(({ name, id }) => {
          const pagetitle = `#${id} - ${name}`;
          const pageDescripcion = `Información del pokémon ${name} con id ${id}`;
          this.title.setTitle(pagetitle);
          this.meta.updateTag({ name: 'description', content: pageDescripcion });
          this.meta.updateTag({ name: 'og:title', content: pagetitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescripcion });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/versions/generation-i/red-and-blue/${id}.png`,
          });
        }),
      )

      .subscribe(this.pokemons.set);
  }
}
