import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryResource = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({request}) => this.countryService.searchCountryByAlphaCode(request.code)
  })
}
