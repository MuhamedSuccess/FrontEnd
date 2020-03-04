import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";


interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: '/assets/colorlib-regform-2/vendor/jquery/jquery.min.js' },
  { name: 'select2', src: '/assets/colorlib-regform-2/vendor/select2/select2.min.js' },
  { name: 'moment', src: '/assets/colorlib-regform-2/vendor/datepicker/moment.min.js' },
  { name: 'datepicker', src: '/assets/colorlib-regform-2/vendor/datepicker/daterangepicker.js' },
  { name: 'global', src: '/assets/colorlib-regform-2/js/global.js' },
  { name: 'file', src: '/assets/js/file.js' },

  ];


export  const files = [
    'src/assets/colorlib-regform-2/vendor/jquery/jquery.min.js',
    'src/assets/colorlib-regform-2/vendor/select2/select2.min.js',
    'src/assets/colorlib-regform-2/vendor/datepicker/moment.min.js',
    'src/assets/colorlib-regform-2/vendor/datepicker/daterangepicker.js',
    'src/assets/colorlib-regform-2/js/global.js',
    'src/assets/js/file.js'
  ];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

    constructor(private http: HttpClient) {
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
  }


  load_scripts() {
      this.loads(files);
  }

    loads(scripts) {
    this.http.get(scripts[0]).pipe(map(res => {})).subscribe(
      data => {
        // eval(data);
        console.log(data);
        if (scripts.length > 1) {
        this.loads(scripts.slice(1));
      }
      }, error => {
        console.log(error);
      }

    );
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
        console.log(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
