import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { simplePageInterface } from '../../interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemons-card',
  imports: [RouterLink],
  templateUrl: './pokemons-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsCard {
  public pokemons = input.required<simplePageInterface>();
  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/versions/generation-i/red-and-blue/${this.pokemons().id}.png`,
  );
}
