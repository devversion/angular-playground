import {PlaygroundIde} from 'playground-elements/playground-ide';

async function main() {
  const ide = document.querySelector('playground-ide') as PlaygroundIde;
  const assetUrls = {
    INDEX_HTML: new URL('./static-defaults/index.html.txt', import.meta.url),
    MAIN_TS: new URL('./static-defaults/main.ts.txt', import.meta.url),
  };

  ide.config = {
    importMap: {
      imports: {
        // To speed up RxJS and fix the cross-file extension-less imports which break in ESM.
        'rxjs/operators': 'https://unpkg.com/@esm-bundle/rxjs/esm/es2015/rxjs-operators.min.js',
        rxjs: 'https://unpkg.com/@esm-bundle/rxjs/esm/es2015/rxjs.min.js',
      },
    },
    files: {
      'main.ts': {
        content: await (await fetch(assetUrls.MAIN_TS.toString())).text(),
      },
      'index.html': {
        content: await (await fetch(assetUrls.INDEX_HTML.toString())).text(),
      },
    },
  };

  ide.resizable = true;
  ide.lineNumbers = true;
  ide.editableFileSystem = true;
}

main().catch(e => console.error(e));
