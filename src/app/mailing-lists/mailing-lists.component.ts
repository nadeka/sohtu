import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailingList } from '../models/mailing-list';
import { MailingListsService } from '../services/mailing-lists.service';

@Component({
  selector: 'mailing-lists',
  styleUrls: [ './mailing-lists.style.css' ],
  providers: [MailingListsService],
  templateUrl: './mailing-lists.template.html'
})
export class MailingLists {
  mailingLists: MailingList[];

  constructor(private mailingListsService: MailingListsService) {}

  ngOnInit() {
    this.getMailingLists();
  }

  getMailingLists(): void {
    this.mailingListsService.getMailingLists().then(lists => this.mailingLists = lists);
  }
}
