// import { MailingListsService } from './mailing-lists.service';
// import { Contact } from '../../models/contact.model';
// import { MailingList } from '../../models/mailing-list.model';
//
// describe('Service: MailingListsService', () => {
//     let mailingListsService: MailingListsService;
//
//     beforeEach(function() {
//         mailingListsService = new MailingListsService();
//     });
//
//     it('should return 3 mailing lists', function() {
//         mailingListsService.getMailingLists()
//             .then(mailingLists => validateMailingLists(mailingLists));
//     });
//
//     it('create mailing list function should work', function() {
//         let c: Contact = new Contact(1, 'firstname', 'lastname', 'test@test.com');
//         let test: MailingList;
//         this.test = mailingListsService.createMailingList(
//                     'test list', 'testing creating list', [c]);
//         expect(this.test.members.length).toBe(1);
//     });
// });
//
// function validateMailingLists(mailingLists) {
//     expect(mailingLists.length).toBe(3);
// }
