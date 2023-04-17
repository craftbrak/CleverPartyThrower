import {Component, OnInit} from '@angular/core';
import {timer} from "rxjs";
import {AuthService} from "./auth/auth.service";
import {EventService} from "./services/event.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Clever Party Thrower';

  constructor(private authService: AuthService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.scheduleTokenRefresh()
  }

  scheduleTokenRefresh() {
    const expiresIn = this.authService.tokenTTL * 1000;
    const refreshBuffer = 10000;

    timer(expiresIn - refreshBuffer)
      .subscribe(async () => {
        await this.authService.refreshTokens();
        // console.log(this.authService.user)
        this.scheduleTokenRefresh() // Schedule the next refresh
      });
  }
}
