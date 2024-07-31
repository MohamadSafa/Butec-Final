import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  QueryList,
  AfterViewInit,
  ViewChildren,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';
import {
  BreakpointObserver,
  BreakpointState,
  LayoutModule,
  MediaMatcher,
} from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;
  
  screenSize = window.matchMedia('(max-width: 991px)');
  currentRoute : string | undefined;
  collapseMenu: boolean = false;
  navColor: any = 'black';
  navPosition: any = 'absolute';
  isOpen: any = false;
  i: any = 1;
  opened: any = -1;
  selectedLanguage: any = 'english';
  selectedLanguageId: any = 2;

  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private route: Router,
    private renderer: Renderer2,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    public translate: TranslateService,
    private cdref: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateActiveLinks();

  }
});
  }
  updateActiveLinks() {
    throw new Error('Method not implemented.');
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
    console.log('hi');  }



  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
      this.getPageColor();
    this.GetNavPosition();
    this.cdref.detectChanges();
    this.updateActiveLinks();
  }

  updateActiveLink(): void {
    this.navLinks.forEach((link) => {
      const href = link.nativeElement.getAttribute('href');
      if (href === this.currentRoute) {
        this.renderer.addClass(link.nativeElement, 'active');
      } else {
        this.renderer.removeClass(link.nativeElement, 'active');
      }
    });
  }

  getPageColor(): any {
    this.common.changeNavColor.subscribe((color) => {
      this.navColor = color;
    });
    return this.navColor;
  }

  GetNavPosition(): any {
    this.common.navPosition.subscribe((position) => {
      this.navPosition = position;
    });
    return this.navPosition;
  }

  ChangeImageSRC(isOpen: any) {
    var menuImage = document.getElementById('menuImage') as HTMLImageElement;
    if (isOpen == true) {
      menuImage.src = './assets/icons/hamb-line.svg';
      this.isOpen = false;
    } else {
      menuImage.src = './assets/icons/close_icon_white.svg';
      this.isOpen = true;
    }
  }

  menuStatus(collapseMenu: any) {

    if (this.screenSize.matches) {
      if (collapseMenu == true) {
        var hamb = document.getElementById('nav1') as HTMLElement;
        hamb?.style.setProperty('display', 'none');
        this.collapseMenu = true;
        this.isOpen = false;
      } else {
        var hamb = document.getElementById('nav1') as HTMLElement;
        hamb?.style.setProperty('display', 'block');
        this.collapseMenu = false;
        this.isOpen = true;
      }
    } else {
      this.isOpen = false;
      this.collapseMenu = false;
      var hamb = document.getElementById('nav1') as HTMLElement;
      hamb?.style.setProperty('display', 'block');
    }
  }

  openMenu(Open: any) {

    if (this.screenSize.matches) {
      if (Open == true) {
        var hamb = document.getElementById('nav1') as HTMLElement;
        hamb?.style.setProperty('display', 'none');
        this.collapseMenu = true;
        this.isOpen = false;
      } else {
        var hamb = document.getElementById('nav1') as HTMLElement;
        hamb?.style.setProperty('display', 'block');
        this.collapseMenu = false;
        this.isOpen = true;
      }
    } else {
      this.collapseMenu = false;
      var hamb = document.getElementById('nav1') as HTMLElement;
      hamb?.style.setProperty('display', 'block');
    }
  }

  GoToHomePage() {
    this.router.navigateByUrl('/HomePage');
  }

  GoToPage(pageName: any) {
    this.common.GoToPage(pageName);
  }


  autoCloseForDropdownCars(event: any) {
    var target = event.target;
    if (!target.closest('.navbar')) {

    }
  }

  addStyle(val: any) {
    var submenuId = document.getElementById(val);
    if (val === 'Business Lines') {
      if (submenuId?.style.display == 'block') {
        submenuId?.style.setProperty('display', 'none');
      } else {
        submenuId?.style.setProperty('display', 'block');
      }
    }
    if (val === 'About') {
      if (submenuId?.style.display == 'block') {
        submenuId?.style.setProperty('display', 'none');
      } else {
        submenuId?.style.setProperty('display', 'block');
      }
    }
  }

  over(val: any) {
    var submenuId = document.getElementById(val);

    submenuId?.style.setProperty('display', 'block');
  }

  out(val: any) {
    var submenuId = document.getElementById(val);
    submenuId?.style.setProperty('display', 'none');
  }

  switchLanguage(language: any){
    this.translate.use(language);
    this.ShowLanguage(language, false);
  }

  ShowLanguage(language: any, OnInit: any){
    if(language == 'arabic'){
      this.selectedLanguageId = '1';
      this.selectedLanguage = 'arabic';
    }else if (language == 'french'){
      this.selectedLanguageId = '3';
      this.selectedLanguage = 'french';
    }else{
      this.selectedLanguageId = '2';
      this.selectedLanguage = 'english';
    }
  }
}
