import { Component, ElementRef, OnInit, HostListener, ViewChild } from '@angular/core';
import { CommonService } from './services/common/common.service';
import { ToastrService } from 'ngx-toastr';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingService } from './loading.service';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('topScrollAnchor') topScroll: ElementRef;
  title = 'Butec.Presentation';
  // faCheckCircle = faCheckCircle;
  // faTimesCircle = faTimesCircle;
  private currentSectionIndex: number = 0;
  private sections: HTMLElement[];
  isLoading: boolean = false;
  isHeaderFooterIncluded: boolean = false;
  toastr: any;

  constructor(
    private el: ElementRef,
    public common: CommonService,
    private scroller: ViewportScroller,
    public router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private translate: TranslateService,
  ) {
    this.sections = [];
    translate.setDefaultLang('english');
    translate.use('english')
  }

  showSuccess() {
    this.toastr.success('Section Added Successfully');
  }

  showError() {
    this.toastr.error('Something went wrong');
  }

  confirmDelete() {
    const dialogRef = document.createElement('app-confirmation-dialog');
    document.body.appendChild(dialogRef);

    dialogRef.addEventListener('confirm', () => {
      document.body.removeChild(dialogRef);
      this.toastr.success('Project deleted successfully');
    });

    dialogRef.addEventListener('cancel', () => {
      document.body.removeChild(dialogRef);
    });
  }


  ngOnInit(): void {
    this.sections = Array.from(document.querySelectorAll('.section'));
    this.HeaderFooterIncluded();
    let alldrpdwn = document.querySelectorAll('.dropdown-container');
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
        window.scrollTo(0, 0);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.hide();
      }
    });
  
    alldrpdwn.forEach((item: any) => {
      const a = item.parentElement?.querySelector('a:first-child');
      a.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.el.nativeElement.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  }

  // responsivemenu
  responsiveMenu: any;

  //reponsivemaincontent
  responsiveContent: any;
  defaultStatus = true;
  openNav(status: any) {
    if (status === this.defaultStatus) {
      this.responsiveMenu = {
        display: 'block',
      };
      this.responsiveContent = {
        'margin-left': '150px',
      };
      this.defaultStatus = false;
    } else {
      this.responsiveMenu = {
        display: null,
      };
      this.responsiveContent = {
        'margin-left': null,
      };
      this.defaultStatus = true;
    }
  }

  HeaderFooterIncluded() {
    var page;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        page = this.router.url.split(/([!,?,.])/);
        this.isHeaderFooterIncluded = this.common.ExcludeFromFloating(page);
      }
    });
  }

  onDeactivate() {
    //document.body.scrollTop = 0;
    window.scroll(0,0);
  }

  onNavigate(event: any) {
    this.topScroll.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
