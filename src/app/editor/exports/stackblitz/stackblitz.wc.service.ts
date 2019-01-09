import { Injectable } from '@angular/core';
import { XlayersNgxEditorModel } from '../../code-editor/editor-container/codegen/codegen.service';
import { StackBlitzProjectPayload } from './stackblitz.service';

@Injectable({
  providedIn: 'root'
})
export class ExportStackblitzWCService {
  constructor() {}
  prepare(content: XlayersNgxEditorModel[]): StackBlitzProjectPayload {
    const files = {};
    for (let i = 0; i < content.length; i++) {
      for (const prop in content[i]) {
        if (prop === 'uri') {
          files['index.js'] = content[i].value;
        }
      }
    }

    // add extra files
    files['index.html'] = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>WC xlayers.app</title>
      </head>
      <body>
      <x-layers-element></x-layers-element>
      </body>
      <script src="index.js"></script>
    </html>`;


    return {
      files,
      dependencies: {['@webcomponents/webcomponentsjs']: '2.0.2'},
      template: 'javascript',
      tags: ['web component']
    };
  }
}
