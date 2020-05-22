import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'enterprise-solutions';
  constructor(private translate: TranslateService) {
    this.initTranslate();
  }
  initTranslate() {
    if (this.translate.getBrowserLang() != undefined) {
      this.translate.setDefaultLang(this.translate.getBrowserLang());
    } else {
      this.translate.setDefaultLang('es');
    }
  }
}
