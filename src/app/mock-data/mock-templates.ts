import { Template } from '../models/template.model';

export const TEMPLATES: Template[] = [
    new Template(1, 'Template 1',
        '<!-- Email content starts-->' +
        '<table style="width: 100%;">' +
        '<!-- Header starts -->' +
        '<tr>' +
        '<div class="tinymce">' +
        '<h1 style="background-color: #ffb3b3; padding: 1em;">Your header here!</h1>' +
        '</div>' +
        '</tr>' +
        '<!-- Header ends-->' +
        '<!-- Paragraph 1 starts -->' +
        '<tr>' +
        '<div class="tinymce">' +
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Sed posuere interdum sem. Quisque ligula eros ullamcorper quis,lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.Sed augue orci, lacinia eu tincidunt et eleifend nec lacus.</p>' +
        '</div>' +
        '</tr>' +
        '<!-- Paragraph 1 ends -->' +
        '<!-- Separator line starts -->' +
        '<tr>' +
        '<p style="border-bottom: 1px solid gray; width: 70%; margin: auto; margin-bottom: 1em"></p>' +
        '</tr>' +
        '<!-- Separator line ends -->' +
        '<!-- Paragraph 2 starts -->' +
        '<tr>' +
          '<div class="tinymce">' +
            '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.Sed augue orci, lacinia eu tincidunt et eleifend nec lacus.</p>' +
          '</div>' +
        '</tr>' +
        '<!-- Paragraph 2 ends -->' +
        '<!-- Footer starts -->' +
        '<tr>' +
            '<p style="background-color: #8c8c8c; padding: 2em; margin: 1em;">' +
              '<a href="">Like us on Facebook!</a>' +
              '<br>' +
              '<br>' +
              '<a href="">Follow us on Twitter!</a>' +
            '</p>' +
        '</tr>' +
        '<!-- Footer ends -->' +
        '</table>' +
        '<!-- Email content ends-->', ''),
    new Template(2, 'Template 2',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
            '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
            '<h1>Hello!</h1>' +
            '<p>I am template 2</p>' +
        '</body>', ''),
    new Template(3, 'Template 3',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
            '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
            '<h1>Hello!</h1>' +
            '<p>I am template 3</p>' +
        '</body>', ''),
    new Template(4, 'Template 4',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
        '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
        '<h1>Hello!</h1>' +
        '<p>I am template 4</p>' +
        '</body>', ''),
    new Template(5, 'Template 5',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
        '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
        '<h1>Hello!</h1>' +
        '<p>I am template 5</p>' +
        '</body>', ''),
    new Template(6, 'Template 6',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
        '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
        '<h1>Hello!</h1>' +
        '<p>I am template 6</p>' +
        '</body>', ''),
    new Template(7, 'Template 7',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
        '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
        '<h1>Hello!</h1>' +
        '<p>I am template 7</p>' +
        '</body>', ''),
    new Template(8, 'Template 8',
        '<!DOCTYPE html>' +
        '<html lang="">' +
        '<head>' +
        '<meta charset="utf-8"' +
        '</head>' +
        '<body>' +
        '<h1>Hello!</h1>' +
        '<p>I am template 8</p>' +
        '</body>', ''),
    new Template(9, 'Template 9',
            '<h1 style="color: red;">Hello!</h1>' +
            '<p style="color: blue;">I am template 9. sfsdfsdfsd' +
        'dfgdferhdfdrter' +
        'asdadasdasdsd</p>', ''),

];
