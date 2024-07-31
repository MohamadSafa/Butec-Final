import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';

@Component({
  selector: 'app-butec-academy',
  templateUrl: './butec-academy.component.html',
  styleUrls: ['./butec-academy.component.css'],
})
export class ButecAcademyComponent {
  languageId: any = 2;
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private cdref: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    translate.onLangChange.subscribe((lang) => {
      if (lang.lang == 'french') {
        this.languageId = '3';
        
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
      } else {
        this.languageId = '2';;
      }
    });
  }

  ngOnInit(): void {
    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
    } else {
      this.languageId = '2';
    }
  }

  // ngAfterContentChecked() {
    
  //   setTimeout(() => {
  //     this.common.navPosition.next('sticky');
  //   }, 10);
    
  //     this.common.changeNavColor.next('black');
  
  //   // setTimeout(() => {
  //     this.cdref.detectChanges();
  //   // }, 20);
    
  // }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('sticky');
      this.common.changeNavColor.next('black');
    }, 50)
  }

  GotoPostionsPage() {
    this.router.navigateByUrl('/Positions');
  }
}
