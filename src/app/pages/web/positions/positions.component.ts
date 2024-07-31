import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent {
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.common.changeNavColor.next('black');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('sticky');
      this.common.changeNavColor.next('black');
    }, 50)
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

  GoToCareers(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/Butec/Apply');
    });
  }
}
