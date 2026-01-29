import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import type { Country } from '../../interfaces/country.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries = input.required<Country[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
