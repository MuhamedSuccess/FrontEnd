import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: '/assets/js/jquery.min.js' },
  { name: 'modernizr', src: '/assets/js/modernizr-2.6.2.min.js' },
  { name: 'respond', src: '/assets/js/respond.min.js' },
  { name: 'jquery.easing', src: '/assets/js/jquery.easing.1.3.js' },
  { name: 'bootstrap', src: '/assets/js/bootstrap.min.js' },
  { name: 'jquery.waypoints', src: '/assets/js/jquery.waypoints.min.js' },
  { name: 'sticky', src: '/assets/js/sticky.js' },
  { name: 'jquery.stellar', src: '/assets/js/jquery.stellar.min.js'},
  { name: 'hoverIntent', src: '/assets/js/hoverIntent.js'},
  { name: 'superfish', src: '/assets/js/superfish.js'},
  { name: 'jquery.magnific', src: '/assets/js/jquery.magnific-popup.min.js'},
  { name: 'magnific-popup', src: '/assets/js/magnific-popup-options.js'},
  { name: 'bootstrap-datepicker', src: '/assets/js/bootstrap-datepicker.min.js'},
  { name: 'classie', src: '/assets/js/classie.js'},
  { name: 'selectFx', src: '/assets/js/selectFx.js'},
  { name: 'main', src: '/assets/js/main.js'},
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderServiceService {

  private scripts: any = {};
  loaded = false;

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {

      const promises: any[] = [];
      scripts.forEach((script) => promises.push(this.loadScript(script)));
      return Promise.all(promises);
      this.loaded = true;

  }


  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  // IE
            script.onreadystatechange = () => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  // Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
