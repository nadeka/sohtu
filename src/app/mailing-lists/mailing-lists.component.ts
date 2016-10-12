import { Component } from '@angular/core';
import { MailingList } from '../models/mailing-list.model';
import { MailingListsService } from '../services/mailing-lists/mailing-lists.service';

@Component({
  selector: 'mailing-lists',
  styleUrls: [ 'mailing-lists.style.css' ],
  providers: [MailingListsService],
  templateUrl: 'mailing-lists.template.html'
})
export class MailingLists {
  mailingLists: Array<MailingList> = [];

  constructor(private mailingListsService: MailingListsService) {}

  ngOnInit() {
    this.getMailingLists();
  }

  getMailingLists(): void {
    this.mailingListsService.getMailingLists().then(mailingLists =>
                              this.mailingLists = mailingLists);
  }
}
