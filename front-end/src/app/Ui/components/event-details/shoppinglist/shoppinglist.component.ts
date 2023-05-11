import {Component} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {AuthService} from "../../../../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AddShoppingItemComponent} from "./add-shopping-item/add-shopping-item.component";
import {Observable, startWith, Subject, switchMap, tap} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent {
  eventId: string | undefined
  eventToUserId: string | undefined
  eventShoppingList: Event_shoppingList | undefined
  state$: Observable<Event_shoppingList> | undefined
  private dataRefreshTrigger$: Subject<void>;

  constructor(public sanitizer: DomSanitizer, public dialog: MatDialog, private eventService: EventService, private authService: AuthService,) {
    console.log('shoping')
    this.dataRefreshTrigger$ = new Subject<void>();
    this.state$ =
      this.dataRefreshTrigger$.pipe(
        startWith(null), // Trigger the initial data load
        switchMap(() => {
          return this.eventService.getEventShoppingList(this.eventId!)
        }),
        tap(value => {
          this.eventShoppingList = value
          console.debug(value)
        })
      );
    this.eventService.selectedEventId$.subscribe(value => {
      this.eventId = value!;
      this.dataRefreshTrigger$.next()
    })
    this.eventService.eventToUserId$.subscribe(value => {
      this.eventToUserId = value!!
      this.dataRefreshTrigger$.next()
    })
  }


  openDialog() {
    this.dialog.open(AddShoppingItemComponent).afterClosed().subscribe(value => {
      if (value) {
        this.dataRefreshTrigger$.next()
      }
    })
  }

  updateItemBougthStatus(id: string, value: boolean) {
    console.debug('item changed')
    this.eventService.updateShoppingListItem(id, {bought: value}).subscribe(value1 => this.dataRefreshTrigger$.next())
  }

}

export interface Assigned {
  avatar: string;
  id: string;
  name: string;
}

export interface ShoppingList {
  assigned: Assigned;
  id: string;
  name: string;
  price: number;
  bought: boolean;
}

export interface Event_shoppingList {
  shoppingList: ShoppingList[];
  id: string;
}
