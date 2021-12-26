import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';

  private overAllBusyIndicator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public busy$ = this.overAllBusyIndicator.asObservable();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  panelOpenState = true;
  hardcodedValue = false;

  ngOnInit(): void {
  }

  actionClick(start: boolean) {
    if (start) {
      // this.overAllBusyIndicator = this.getNewSubject(start);
      // this.busy$ = this.getNewObs(this.overAllBusyIndicator);
      this.overAllBusyIndicator.next(true);
    } else {
      this.overAllBusyIndicator.next(false);
    }
    this.hardcodedValue = start;
  }

  getNewSubject(val: boolean): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(val);
  }

  getNewObs(sub: BehaviorSubject<boolean>) {
    return sub.asObservable();
  }

  getCurrentDate() {
    return new Date().toTimeString();
  }

}
