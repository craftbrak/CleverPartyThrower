import {Component, Input, OnInit} from '@angular/core';
import {MemberData} from "../members.component";
import {UserRole} from "../../../../../entities/event-to-user.entity";
import {EventService} from "../../../../../services/event.service";
import {AuthService} from "../../../../../auth/auth.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @Input() member: MemberData | undefined
  userRoles = [UserRole.INVITED, UserRole.MEMBER];
  showRoleSelector = false
  showParticipationSelector = false

  constructor(private eventService: EventService, private authService: AuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'account_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://fonts.gstatic.com/s/i/materialicons/account_circle/v12/24px.svg')
    );
  }

  ngOnInit(): void {
    if (this.member?.user.id === this.authService.user?.id && this.member?.role === UserRole.INVITED) {
      // this.showRoleSelector = !this.showRoleSelector
      this.showParticipationSelector = !this.showParticipationSelector
    }
    console.log(this.member?.user, this.authService.user?.id)
  }

}