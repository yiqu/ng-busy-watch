import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { getDataStart } from '../store/global/api.actions';
import { AppState } from '../store/global/app.reducer';
import * as fromApiSelectors from '../store/global/app.selectors';

@Injectable({providedIn: 'root'})
export class ApiService {

  public dataLoading$ = this.store.select(fromApiSelectors.getisDataLoading);
  public data$ = this.store.select(fromApiSelectors.getApiData);

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getGitHubApiObs() {
    return this.http.get('https://api.github.com/users/defunkt').pipe(
      delay(4000)
    );
  }

  fetchData() {
    this.store.dispatch(getDataStart());
  }
}
