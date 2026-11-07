import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonsCard } from '../pokemons-card/pokemons-card';
import { simplePageInterface } from '../../interface';

@Component({
  selector: 'pokemons-list',
  imports: [PokemonsCard],
  templateUrl: './pokemons-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsList {
  public pokemons = input.required<simplePageInterface[]>();
}
