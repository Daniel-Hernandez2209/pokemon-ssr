import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-list-eskeleton',
  imports: [],
  templateUrl: './pokemon-list-eskeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListEskeleton {}
