import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { ApiService } from "../../shared/api.service";
import * as fromApiActions from './api.actions';


@Injectable()
export class AppGlobalEffects {

  constructor(public actions$: Actions, private as: ApiService) {
  }

  getApiData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromApiActions.getDataStart),
      switchMap((res) => {
        return this.as.getGitHubApiObs().pipe(
          map((res) => {
            return fromApiActions.getDataSuccess({payload: res});
          }),
          catchError((err) => {
            return of(fromApiActions.getDataFailure({errMsg: err}));
          })
        )
      })
    );
  });

}


export const appEffects = [
  AppGlobalEffects
]
