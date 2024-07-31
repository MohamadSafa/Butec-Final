import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  max: any = 2;
  branchesList: any;
  branchesListLength: any;
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.GetBranches();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('sticky');
      this.common.changeNavColor.next('black');
    }, 50);
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

  GetBranches() {
    //this.branchesList = this.common.GetBranches();
    this.common.loadBranches().subscribe((branches) => {
      this.branchesList = branches;
      this.branchesListLength = this.branchesList.length;
    });
  }

  toggle(): void {
    if (this.max != this.branchesListLength) {
      //this.max = this.max + 50;
      this.max = this.branchesListLength;
    } else {
      this.max = 2;
    }
  }
}
