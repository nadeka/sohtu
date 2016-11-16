import { Injectable } from '@angular/core';
import { Settings } from '../settings';

// English congifuration
export var eng: { [key: string]: string; } = {
  'CAMPAIGN_NAME_LABEL' : 'Campaign Name',
  'CAMPAIGN_SUBJECT_LABEL' : 'Subject',
  'SELECT_ALL_BUTTON_LABEL' : 'Select all',
  'DESELECT_ALL_BUTTON_LABEL' : 'Deselect all',
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
  'MAILING_LIST_DESCRIPTION_LABEL' : 'Description'
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
