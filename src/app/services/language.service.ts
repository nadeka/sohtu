import { Injectable } from '@angular/core';
import { Settings } from '../settings';

// English congifuration
export var eng: { [key: string]: string; } = {
  'DASHBOARD_LABEL' : 'Dashboard',
  'CONTACTS_LABEL' : 'Contacts',
  'MARKETING_LABEL' : 'Marketing',
  'OVERVIEW_LABEL' : 'Overview',
  'CAMPAIGNS_LABEL' : 'Campaigns',
  'CREATE_NEW_CAMPAIGN_LABEL' : 'Create New Campaign',
  'MAILING_LISTS_LABEL' : 'Mailing Lists',
  'SETTINGS_LABEL' : 'Settings',
  'TEMPLATES_LABEL' : 'Templates',
  'SOCIAL_MEDIA_LABEL' : 'Social Media',
  'REPORTS_LABEL' : 'Reports',
  'TEMPLATE_LABEL' : 'Template',
  'CONTENT_LABEL' : 'Content',
  'SCHEDULE_LABEL' : 'Schedule',
  'NEXT_LABEL' : 'Next',
  'PREVIOUS_LABEL' : 'Previous',
  'CONFIRMATION_LABEL' : 'Confirmation',
  'CONFIRM_LABEL' : 'Confirm',
  'CAMPAIGN_NAME_LABEL' : 'Campaign Name',
  'CAMPAIGN_SUBJECT_LABEL' : 'Subject',
  'SELECT_ALL_BUTTON_LABEL' : 'Select all',
  'DESELECT_ALL_BUTTON_LABEL' : 'Deselect all',
  'CHOOSE_BUTTON_LABEL' : 'Choose',
  'OK_BUTTON_LABEL' : 'Ok',
  'RESET_BUTTON_LABEL' : 'Reset',
  'MAILING_LISTS_HEADER' : 'Mailing lists',
  'CAMPAIGN_TEMPLATES_HEADER' : 'Campaign Template',
  'IMPORT_BUTTON_LABEL' : 'Import',
  'IMPORT_MAILING_LIST_HEADER' : 'Import mailing list',
  'CHOOSE_FILE' : 'Choose file',
  'NO_FILE_CHOSEN' : 'No file chosen',
  'FILE_PARSE_ERROR' : 'Could not parse file',
  'ACCEPTED_FILE_FORMATS' : 'Accepted formats: .csv',
  'ACCEPTED_FILE_CONTENT' : 'The first row of the file should be a header containing ' +
  'the column names, for example: "First name";"Last name";"Email"',
  'MAILING_LIST_NAME_LABEL' : 'Name',
  'MAILING_LIST_DESCRIPTION_LABEL' : 'Description',
  'EMAIL_SUBJECT_LABEL' : 'Subject For Email',
  'EMAIL_SEND_TO' : 'Send to',
  'TEST_EMAIL_HEADER' : 'Send Test Email',
  'MEMBER_COUNT_LABEL' : 'Member count',
  'CHANGE_TEMPLATE_QUESTION' : 'Change template?',
  'MODIFIED_CONTENT_LOST_INFO' : 'All your modified content will be lost.',
  'ARE_YOU_SURE_QUESTION' : 'Are you sure?',
  'YES_CHANGE_TEMPLATE' : 'Yes, change template',
  'CANCEL_BUTTON_LABEL' : 'Cancel',
  'CAMPAIGN_SCHEDULE_LABEL' : 'Campaign Schedule',
  'WILL_BE_SENT' : 'Will be sent',
  'CAMPAIGN_WILL_BE_SENT_LABEL': 'Campaign will be sent on ',
  'SET_CURRENT_TIME_BUTTON' : 'Set current time',
  'CAMPAIGN_OVERVIEW' : 'Campaign Overview',
  'CAMPAIGN_CREATED_ALERT' : 'Campaign created succesfully!',
  'ERROR_CAMPAIGN_NAME_MISSING' : 'Campaign name must be filled',
  'ERROR_CAMPAIGN_SUBJECT_MISSING' : 'Campaign subject must be filled',
  'ERROR_CAMPAIGN_NAME_MISSING_OR_SHORT' : 'Campaign name must be filled and be over 2 characters long',
  'ERROR_CAMPAIGN_SUBJECT_MISSING_OR_SHORT' : 'Campaign subject must be filled and be over 2 characters long',
  'ERROR_MAILING_LIST_MISSING' : 'Atleast one (1) mailing list must be chosen!',
  'ERROR_MAILING_LIST_NAME_MISSING_OR_SHORT' : 'Name is required or the name is too short (min 3 characters)',
  'ERROR_MAILING_LIST_NAME_TAKEN' : 'Name is already taken',
  'ERROR_TEMPLATE_MUST_BE_CHOSEN' : 'A template must be chosen',
  'ERROR_TEST_EMAIL_ADDRESS_MISSING' : 'Email address must be given in the right form',
  'SEND_TEST_EMAIL' : 'Send test email',
  'TEST_EMAIL_SENT_ALERT' : 'Test email sent succesfully!'

};

@Injectable()
export class LanguageService {

  public getWord(word: string): string {

    if (Settings.LANGUAGE === 'ENG') {
      return eng[word];
    }
    return 'Null';
  }
}
