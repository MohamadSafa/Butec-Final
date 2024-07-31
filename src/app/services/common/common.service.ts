import { AnimationStyleMetadata, style } from '@angular/animations';
//import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Observable, Subject, map } from 'rxjs';
import { ModalConfirmComponent } from 'src/app/pages/cms/modal-confirm/modal-confirm.component';
import { ModalDescriptionComponent } from 'src/app/pages/cms/modal-description/modal-description.component';
import { EntitiesService } from '../entities/entities.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    public router: Router,
    private readonly _modalService: ModalService,
    public entitiesService: EntitiesService,
    private translate: TranslateService
  ) {
    this.loadExpertiseBoxes();
    this.loadBranches();
  }

  loadExpertiseBoxes(): Observable<any[]> {
    const boxkeys = [
      'expertise.boxes.engineeringAndContractingBox1.Id',
      'expertise.boxes.engineeringAndContractingBox1.boxUsed',
      'expertise.boxes.engineeringAndContractingBox1.boxNumber',
      'expertise.boxes.engineeringAndContractingBox1.boxText',
      'expertise.boxes.engineeringAndContractingBox1.class1',
      'expertise.boxes.engineeringAndContractingBox1.class2',
      'expertise.boxes.engineeringAndContractingBox1.style',
      'expertise.boxes.engineeringAndContractingBox1.suffix',

      'expertise.boxes.engineeringAndContractingBox2.Id',
      'expertise.boxes.engineeringAndContractingBox2.boxUsed',
      'expertise.boxes.engineeringAndContractingBox2.boxNumber',
      'expertise.boxes.engineeringAndContractingBox2.boxText',
      'expertise.boxes.engineeringAndContractingBox2.class1',
      'expertise.boxes.engineeringAndContractingBox2.class2',
      'expertise.boxes.engineeringAndContractingBox2.style',
      'expertise.boxes.engineeringAndContractingBox2.suffix',

      'expertise.boxes.engineeringAndContractingBox3.Id',
      'expertise.boxes.engineeringAndContractingBox3.boxUsed',
      'expertise.boxes.engineeringAndContractingBox3.boxNumber',
      'expertise.boxes.engineeringAndContractingBox3.boxText',
      'expertise.boxes.engineeringAndContractingBox3.class1',
      'expertise.boxes.engineeringAndContractingBox3.class2',
      'expertise.boxes.engineeringAndContractingBox3.style',
      'expertise.boxes.engineeringAndContractingBox3.suffix',

      'expertise.boxes.engineeringAndContractingBox4.Id',
      'expertise.boxes.engineeringAndContractingBox4.boxUsed',
      'expertise.boxes.engineeringAndContractingBox4.boxNumber',
      'expertise.boxes.engineeringAndContractingBox4.boxText',
      'expertise.boxes.engineeringAndContractingBox4.class1',
      'expertise.boxes.engineeringAndContractingBox4.class2',
      'expertise.boxes.engineeringAndContractingBox4.style',
      'expertise.boxes.engineeringAndContractingBox4.suffix',

      'expertise.boxes.electroMechanicalBox1.Id',
      'expertise.boxes.electroMechanicalBox1.boxUsed',
      'expertise.boxes.electroMechanicalBox1.boxNumber',
      'expertise.boxes.electroMechanicalBox1.boxText',
      'expertise.boxes.electroMechanicalBox1.class1',
      'expertise.boxes.electroMechanicalBox1.class2',
      'expertise.boxes.electroMechanicalBox1.style',
      'expertise.boxes.electroMechanicalBox1.suffix',

      'expertise.boxes.electroMechanicalBox2.Id',
      'expertise.boxes.electroMechanicalBox2.boxUsed',
      'expertise.boxes.electroMechanicalBox2.boxNumber',
      'expertise.boxes.electroMechanicalBox2.boxText',
      'expertise.boxes.electroMechanicalBox2.class1',
      'expertise.boxes.electroMechanicalBox2.class2',
      'expertise.boxes.electroMechanicalBox2.style',
      'expertise.boxes.electroMechanicalBox2.suffix',

      'expertise.boxes.electroMechanicalBox3.Id',
      'expertise.boxes.electroMechanicalBox3.boxUsed',
      'expertise.boxes.electroMechanicalBox3.boxNumber',
      'expertise.boxes.electroMechanicalBox3.boxText',
      'expertise.boxes.electroMechanicalBox3.class1',
      'expertise.boxes.electroMechanicalBox3.class2',
      'expertise.boxes.electroMechanicalBox3.style',
      'expertise.boxes.electroMechanicalBox3.suffix',

      'expertise.boxes.electroMechanicalBox4.Id',
      'expertise.boxes.electroMechanicalBox4.boxUsed',
      'expertise.boxes.electroMechanicalBox4.boxNumber',
      'expertise.boxes.electroMechanicalBox4.boxText',
      'expertise.boxes.electroMechanicalBox4.class1',
      'expertise.boxes.electroMechanicalBox4.class2',
      'expertise.boxes.electroMechanicalBox4.style',
      'expertise.boxes.electroMechanicalBox4.suffix',

      'expertise.boxes.facilityServicesBox1.Id',
      'expertise.boxes.facilityServicesBox1.boxUsed',
      'expertise.boxes.facilityServicesBox1.boxNumber',
      'expertise.boxes.facilityServicesBox1.boxText',
      'expertise.boxes.facilityServicesBox1.class1',
      'expertise.boxes.facilityServicesBox1.class2',
      'expertise.boxes.facilityServicesBox1.style',
      'expertise.boxes.facilityServicesBox1.suffix',

      'expertise.boxes.facilityServicesBox2.Id',
      'expertise.boxes.facilityServicesBox2.boxUsed',
      'expertise.boxes.facilityServicesBox2.boxNumber',
      'expertise.boxes.facilityServicesBox2.boxText',
      'expertise.boxes.facilityServicesBox2.class1',
      'expertise.boxes.facilityServicesBox2.class2',
      'expertise.boxes.facilityServicesBox2.style',
      'expertise.boxes.facilityServicesBox2.suffix',

      'expertise.boxes.facilityServicesBox3.Id',
      'expertise.boxes.facilityServicesBox3.boxUsed',
      'expertise.boxes.facilityServicesBox3.boxNumber',
      'expertise.boxes.facilityServicesBox3.boxText',
      'expertise.boxes.facilityServicesBox3.class1',
      'expertise.boxes.facilityServicesBox3.class2',
      'expertise.boxes.facilityServicesBox3.style',
      'expertise.boxes.facilityServicesBox3.suffix',

      'expertise.boxes.facilityServicesBox4.Id',
      'expertise.boxes.facilityServicesBox4.boxUsed',
      'expertise.boxes.facilityServicesBox4.boxNumber',
      'expertise.boxes.facilityServicesBox4.boxText',
      'expertise.boxes.facilityServicesBox4.class1',
      'expertise.boxes.facilityServicesBox4.class2',
      'expertise.boxes.facilityServicesBox4.style',
      'expertise.boxes.facilityServicesBox4.suffix',

      'expertise.boxes.utilityServicesBox1.Id',
      'expertise.boxes.utilityServicesBox1.boxUsed',
      'expertise.boxes.utilityServicesBox1.boxNumber',
      'expertise.boxes.utilityServicesBox1.boxText',
      'expertise.boxes.utilityServicesBox1.class1',
      'expertise.boxes.utilityServicesBox1.class2',
      'expertise.boxes.utilityServicesBox1.style',
      'expertise.boxes.utilityServicesBox1.suffix',

      'expertise.boxes.utilityServicesBox2.Id',
      'expertise.boxes.utilityServicesBox2.boxUsed',
      'expertise.boxes.utilityServicesBox2.boxNumber',
      'expertise.boxes.utilityServicesBox2.boxText',
      'expertise.boxes.utilityServicesBox2.class1',
      'expertise.boxes.utilityServicesBox2.class2',
      'expertise.boxes.utilityServicesBox2.style',
      'expertise.boxes.utilityServicesBox2.suffix',

      'expertise.boxes.utilityServicesBox3.Id',
      'expertise.boxes.utilityServicesBox3.boxUsed',
      'expertise.boxes.utilityServicesBox3.boxNumber',
      'expertise.boxes.utilityServicesBox3.boxText',
      'expertise.boxes.utilityServicesBox3.class1',
      'expertise.boxes.utilityServicesBox3.class2',
      'expertise.boxes.utilityServicesBox3.style',
      'expertise.boxes.utilityServicesBox3.suffix',

      'expertise.boxes.utilityServicesBox4.Id',
      'expertise.boxes.utilityServicesBox4.boxUsed',
      'expertise.boxes.utilityServicesBox4.boxNumber',
      'expertise.boxes.utilityServicesBox4.boxText',
      'expertise.boxes.utilityServicesBox4.class1',
      'expertise.boxes.utilityServicesBox4.class2',
      'expertise.boxes.utilityServicesBox4.style',
      'expertise.boxes.utilityServicesBox4.suffix',
    ];
    return this.translate.get(boxkeys).pipe(
      map((translations) => [
        {
          Id: translations['expertise.boxes.engineeringAndContractingBox1.Id'],
          boxUsed:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.boxUsed'
            ],
          boxNumber:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.boxNumber'
            ],
          boxText:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.boxText'
            ],
          class1:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.class1'
            ],
          class2:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.class2'
            ],
          style:
            translations['expertise.boxes.engineeringAndContractingBox1.style'],
          suffix:
            translations[
              'expertise.boxes.engineeringAndContractingBox1.suffix'
            ],
        },
        {
          Id: translations['expertise.boxes.engineeringAndContractingBox2.Id'],
          boxUsed:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.boxUsed'
            ],
          boxNumber:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.boxNumber'
            ],
          boxText:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.boxText'
            ],
          class1:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.class1'
            ],
          class2:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.class2'
            ],
          style:
            translations['expertise.boxes.engineeringAndContractingBox2.style'],
          suffix:
            translations[
              'expertise.boxes.engineeringAndContractingBox2.suffix'
            ],
        },
        {
          Id: translations['expertise.boxes.engineeringAndContractingBox3.Id'],
          boxUsed:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.boxUsed'
            ],
          boxNumber:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.boxNumber'
            ],
          boxText:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.boxText'
            ],
          class1:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.class1'
            ],
          class2:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.class2'
            ],
          style:
            translations['expertise.boxes.engineeringAndContractingBox3.style'],
          suffix:
            translations[
              'expertise.boxes.engineeringAndContractingBox3.suffix'
            ],
        },
        {
          Id: translations['expertise.boxes.engineeringAndContractingBox4.Id'],
          boxUsed:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.boxUsed'
            ],
          boxNumber:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.boxNumber'
            ],
          boxText:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.boxText'
            ],
          class1:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.class1'
            ],
          class2:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.class2'
            ],
          style:
            translations['expertise.boxes.engineeringAndContractingBox4.style'],
          suffix:
            translations[
              'expertise.boxes.engineeringAndContractingBox4.suffix'
            ],
        },
        {
          Id: translations['expertise.boxes.electroMechanicalBox1.Id'],
          boxUsed:
            translations['expertise.boxes.electroMechanicalBox1.boxUsed'],
          boxNumber:
            translations['expertise.boxes.electroMechanicalBox1.boxNumber'],
          boxText:
            translations['expertise.boxes.electroMechanicalBox1.boxText'],
          class1: translations['expertise.boxes.electroMechanicalBox1.class1'],
          class2: translations['expertise.boxes.electroMechanicalBox1.class2'],
          style: translations['expertise.boxes.electroMechanicalBox1.style'],
          suffix: translations['expertise.boxes.electroMechanicalBox1.suffix'],
        },
        {
          Id: translations['expertise.boxes.electroMechanicalBox2.Id'],
          boxUsed:
            translations['expertise.boxes.electroMechanicalBox2.boxUsed'],
          boxNumber:
            translations['expertise.boxes.electroMechanicalBox2.boxNumber'],
          boxText:
            translations['expertise.boxes.electroMechanicalBox2.boxText'],
          class1: translations['expertise.boxes.electroMechanicalBox2.class1'],
          class2: translations['expertise.boxes.electroMechanicalBox2.class2'],
          style: translations['expertise.boxes.electroMechanicalBox2.style'],
          suffix: translations['expertise.boxes.electroMechanicalBox2.suffix'],
        },
        {
          Id: translations['expertise.boxes.electroMechanicalBox3.Id'],
          boxUsed:
            translations['expertise.boxes.electroMechanicalBox3.boxUsed'],
          boxNumber:
            translations['expertise.boxes.electroMechanicalBox3.boxNumber'],
          boxText:
            translations['expertise.boxes.electroMechanicalBox3.boxText'],
          class1: translations['expertise.boxes.electroMechanicalBox3.class1'],
          class2: translations['expertise.boxes.electroMechanicalBox3.class2'],
          style: translations['expertise.boxes.electroMechanicalBox3.style'],
          suffix: translations['expertise.boxes.electroMechanicalBox3.suffix'],
        },
        {
          Id: translations['expertise.boxes.electroMechanicalBox4.Id'],
          boxUsed:
            translations['expertise.boxes.electroMechanicalBox4.boxUsed'],
          boxNumber:
            translations['expertise.boxes.electroMechanicalBox4.boxNumber'],
          boxText:
            translations['expertise.boxes.electroMechanicalBox4.boxText'],
          class1: translations['expertise.boxes.electroMechanicalBox4.class1'],
          class2: translations['expertise.boxes.electroMechanicalBox4.class2'],
          style: translations['expertise.boxes.electroMechanicalBox4.style'],
          suffix: translations['expertise.boxes.electroMechanicalBox4.suffix'],
        },
        {
          Id: translations['expertise.boxes.facilityServicesBox1.Id'],
          boxUsed: translations['expertise.boxes.facilityServicesBox1.boxUsed'],
          boxNumber:
            translations['expertise.boxes.facilityServicesBox1.boxNumber'],
          boxText: translations['expertise.boxes.facilityServicesBox1.boxText'],
          class1: translations['expertise.boxes.facilityServicesBox1.class1'],
          class2: translations['expertise.boxes.facilityServicesBox1.class2'],
          style: translations['expertise.boxes.facilityServicesBox1.style'],
          suffix: translations['expertise.boxes.facilityServicesBox1.suffix'],
        },
        {
          Id: translations['expertise.boxes.facilityServicesBox2.Id'],
          boxUsed: translations['expertise.boxes.facilityServicesBox2.boxUsed'],
          boxNumber:
            translations['expertise.boxes.facilityServicesBox2.boxNumber'],
          boxText: translations['expertise.boxes.facilityServicesBox2.boxText'],
          class1: translations['expertise.boxes.facilityServicesBox2.class1'],
          class2: translations['expertise.boxes.facilityServicesBox2.class2'],
          style: translations['expertise.boxes.facilityServicesBox2.style'],
          suffix: translations['expertise.boxes.facilityServicesBox2.suffix'],
        },
        {
          Id: translations['expertise.boxes.facilityServicesBox3.Id'],
          boxUsed: translations['expertise.boxes.facilityServicesBox3.boxUsed'],
          boxNumber:
            translations['expertise.boxes.facilityServicesBox3.boxNumber'],
          boxText: translations['expertise.boxes.facilityServicesBox3.boxText'],
          class1: translations['expertise.boxes.facilityServicesBox3.class1'],
          class2: translations['expertise.boxes.facilityServicesBox3.class2'],
          style: translations['expertise.boxes.facilityServicesBox3.style'],
          suffix: translations['expertise.boxes.facilityServicesBox3.suffix'],
        },
        {
          Id: translations['expertise.boxes.facilityServicesBox4.Id'],
          boxUsed: translations['expertise.boxes.facilityServicesBox4.boxUsed'],
          boxNumber:
            translations['expertise.boxes.facilityServicesBox4.boxNumber'],
          boxText: translations['expertise.boxes.facilityServicesBox4.boxText'],
          class1: translations['expertise.boxes.facilityServicesBox4.class1'],
          class2: translations['expertise.boxes.facilityServicesBox4.class2'],
          style: translations['expertise.boxes.facilityServicesBox4.style'],
          suffix: translations['expertise.boxes.facilityServicesBox4.suffix'],
        },
        {
          Id: translations['expertise.boxes.utilityServicesBox1.Id'],
          boxUsed: translations['expertise.boxes.utilityServicesBox1.boxUsed'],
          boxNumber:
            translations['expertise.boxes.utilityServicesBox1.boxNumber'],
          boxText: translations['expertise.boxes.utilityServicesBox1.boxText'],
          class1: translations['expertise.boxes.utilityServicesBox1.class1'],
          class2: translations['expertise.boxes.utilityServicesBox1.class2'],
          style: translations['expertise.boxes.utilityServicesBox1.style'],
          suffix: translations['expertise.boxes.utilityServicesBox1.suffix'],
        },
        {
          Id: translations['expertise.boxes.utilityServicesBox2.Id'],
          boxUsed: translations['expertise.boxes.utilityServicesBox2.boxUsed'],
          boxNumber:
            translations['expertise.boxes.utilityServicesBox2.boxNumber'],
          boxText: translations['expertise.boxes.utilityServicesBox2.boxText'],
          class1: translations['expertise.boxes.utilityServicesBox2.class1'],
          class2: translations['expertise.boxes.utilityServicesBox2.class2'],
          style: translations['expertise.boxes.utilityServicesBox2.style'],
          suffix: translations['expertise.boxes.utilityServicesBox2.suffix'],
        },
        {
          Id: translations['expertise.boxes.utilityServicesBox3.Id'],
          boxUsed: translations['expertise.boxes.utilityServicesBox3.boxUsed'],
          boxNumber:
            translations['expertise.boxes.utilityServicesBox3.boxNumber'],
          boxText: translations['expertise.boxes.utilityServicesBox3.boxText'],
          class1: translations['expertise.boxes.utilityServicesBox3.class1'],
          class2: translations['expertise.boxes.utilityServicesBox3.class2'],
          style:
            translations['expertise.boxes.engineeringAndContractingBox1.style'],
          suffix: translations['expertise.boxes.utilityServicesBox3.suffix'],
        },
        {
          Id: translations['expertise.boxes.utilityServicesBox4.Id'],
          boxUsed: translations['expertise.boxes.utilityServicesBox4.boxUsed'],
          boxNumber:
            translations['expertise.boxes.utilityServicesBox4.boxNumber'],
          boxText: translations['expertise.boxes.utilityServicesBox4.boxText'],
          class1: translations['expertise.boxes.utilityServicesBox4.class1'],
          class2: translations['expertise.boxes.utilityServicesBox4.class2'],
          style: translations['expertise.boxes.utilityServicesBox4.style'],
          suffix: translations['expertise.boxes.utilityServicesBox4.suffix'],
        },
      ])
    );
  }

  loadBranches(): Observable<any[]> {
    const box1keys = [
      'contact.headquarters.lebanonBranch.country',
      'contact.headquarters.lebanonBranch.bldg',
      'contact.headquarters.lebanonBranch.address',
      'contact.headquarters.lebanonBranch.POBox',
      'contact.headquarters.lebanonBranch.telephone',
      'contact.headquarters.lebanonBranch.fax',
      'contact.headquarters.lebanonBranch.email',

      'contact.headquarters.UAEBranch1.country',
      'contact.headquarters.UAEBranch1.bldg',
      'contact.headquarters.UAEBranch1.address',
      'contact.headquarters.UAEBranch1.POBox',
      'contact.headquarters.UAEBranch1.telephone',
      'contact.headquarters.UAEBranch1.fax',
      'contact.headquarters.UAEBranch1.email',

      'contact.headquarters.UAEBranch2.country',
      'contact.headquarters.UAEBranch2.bldg',
      'contact.headquarters.UAEBranch2.address',
      'contact.headquarters.UAEBranch2.POBox',
      'contact.headquarters.UAEBranch2.telephone',
      'contact.headquarters.UAEBranch2.fax',
      'contact.headquarters.UAEBranch2.email',

      'contact.headquarters.UAEBranch3.country',
      'contact.headquarters.UAEBranch3.bldg',
      'contact.headquarters.UAEBranch3.address',
      'contact.headquarters.UAEBranch3.POBox',
      'contact.headquarters.UAEBranch3.telephone',
      'contact.headquarters.UAEBranch3.fax',
      'contact.headquarters.UAEBranch3.email',

      'contact.headquarters.algeriaBranch1.country',
      'contact.headquarters.algeriaBranch1.bldg',
      'contact.headquarters.algeriaBranch1.address',
      'contact.headquarters.algeriaBranch1.POBox',
      'contact.headquarters.algeriaBranch1.telephone',
      'contact.headquarters.algeriaBranch1.fax',
      'contact.headquarters.algeriaBranch1.email',

      'contact.headquarters.algeriaBranch2.country',
      'contact.headquarters.algeriaBranch2.bldg',
      'contact.headquarters.algeriaBranch2.address',
      'contact.headquarters.algeriaBranch2.POBox',
      'contact.headquarters.algeriaBranch2.telephone',
      'contact.headquarters.algeriaBranch2.fax',
      'contact.headquarters.algeriaBranch2.email',

      'contact.headquarters.qatarBranch.country',
      'contact.headquarters.qatarBranch.bldg',
      'contact.headquarters.qatarBranch.address',
      'contact.headquarters.qatarBranch.POBox',
      'contact.headquarters.qatarBranch.telephone',
      'contact.headquarters.qatarBranch.fax',
      'contact.headquarters.qatarBranch.email',

      'contact.headquarters.KSABranch.country',
      'contact.headquarters.KSABranch.bldg',
      'contact.headquarters.KSABranch.address',
      'contact.headquarters.KSABranch.POBox',
      'contact.headquarters.KSABranch.telephone',
      'contact.headquarters.KSABranch.fax',
      'contact.headquarters.KSABranch.email',

      'contact.headquarters.moroccoBranch1.country',
      'contact.headquarters.moroccoBranch1.bldg',
      'contact.headquarters.moroccoBranch1.address',
      'contact.headquarters.moroccoBranch1.POBox',
      'contact.headquarters.moroccoBranch1.telephone',
      'contact.headquarters.moroccoBranch1.fax',
      'contact.headquarters.moroccoBranch1.email',

      'contact.headquarters.moroccoBranch2.country',
      'contact.headquarters.moroccoBranch2.bldg',
      'contact.headquarters.moroccoBranch2.address',
      'contact.headquarters.moroccoBranch2.POBox',
      'contact.headquarters.moroccoBranch2.telephone',
      'contact.headquarters.moroccoBranch2.fax',
      'contact.headquarters.moroccoBranch2.email',

      'contact.headquarters.coteDIvoireBranch1.country',
      'contact.headquarters.coteDIvoireBranch1.bldg',
      'contact.headquarters.coteDIvoireBranch1.address',
      'contact.headquarters.coteDIvoireBranch1.POBox',
      'contact.headquarters.coteDIvoireBranch1.telephone',
      'contact.headquarters.coteDIvoireBranch1.fax',
      'contact.headquarters.coteDIvoireBranch1.email',

      'contact.headquarters.coteDIvoireBranch2.country',
      'contact.headquarters.coteDIvoireBranch2.bldg',
      'contact.headquarters.coteDIvoireBranch2.address',
      'contact.headquarters.coteDIvoireBranch2.POBox',
      'contact.headquarters.coteDIvoireBranch2.telephone',
      'contact.headquarters.coteDIvoireBranch2.fax',
      'contact.headquarters.coteDIvoireBranch2.email',

      'contact.headquarters.coteDIvoireBranch3.country',
      'contact.headquarters.coteDIvoireBranch3.bldg',
      'contact.headquarters.coteDIvoireBranch3.address',
      'contact.headquarters.coteDIvoireBranch3.POBox',
      'contact.headquarters.coteDIvoireBranch3.telephone',
      'contact.headquarters.coteDIvoireBranch3.fax',
      'contact.headquarters.coteDIvoireBranch3.email',

      'contact.headquarters.burkinaFasoBranch.country',
      'contact.headquarters.burkinaFasoBranch.bldg',
      'contact.headquarters.burkinaFasoBranch.address',
      'contact.headquarters.burkinaFasoBranch.POBox',
      'contact.headquarters.burkinaFasoBranch.telephone',
      'contact.headquarters.burkinaFasoBranch.fax',
      'contact.headquarters.burkinaFasoBranch.email',

      'contact.headquarters.beninBranch.country',
      'contact.headquarters.beninBranch.bldg',
      'contact.headquarters.beninBranch.address',
      'contact.headquarters.beninBranch.POBox',
      'contact.headquarters.beninBranch.telephone',
      'contact.headquarters.beninBranch.fax',
      'contact.headquarters.beninBranch.email',

      'contact.headquarters.maliBranch.country',
      'contact.headquarters.maliBranch.bldg',
      'contact.headquarters.maliBranch.address',
      'contact.headquarters.maliBranch.POBox',
      'contact.headquarters.maliBranch.telephone',
      'contact.headquarters.maliBranch.fax',
      'contact.headquarters.maliBranch.email',

      'contact.headquarters.nigerBranch.country',
      'contact.headquarters.nigerBranch.bldg',
      'contact.headquarters.nigerBranch.address',
      'contact.headquarters.nigerBranch.POBox',
      'contact.headquarters.nigerBranch.telephone',
      'contact.headquarters.nigerBranch.fax',
      'contact.headquarters.nigerBranch.email',

      'contact.headquarters.senegalBranch.country',
      'contact.headquarters.senegalBranch.bldg',
      'contact.headquarters.senegalBranch.address',
      'contact.headquarters.senegalBranch.POBox',
      'contact.headquarters.senegalBranch.telephone',
      'contact.headquarters.senegalBranch.fax',
      'contact.headquarters.senegalBranch.email',

      'contact.headquarters.togoBranch.country',
      'contact.headquarters.togoBranch.bldg',
      'contact.headquarters.togoBranch.address',
      'contact.headquarters.togoBranch.POBox',
      'contact.headquarters.togoBranch.telephone',
      'contact.headquarters.togoBranch.fax',
      'contact.headquarters.togoBranch.email',

      'contact.headquarters.johannesburgBranch.country',
      'contact.headquarters.johannesburgBranch.bldg',
      'contact.headquarters.johannesburgBranch.address',
      'contact.headquarters.johannesburgBranch.POBox',
      'contact.headquarters.johannesburgBranch.telephone',
      'contact.headquarters.johannesburgBranch.fax',
      'contact.headquarters.johannesburgBranch.email',

      'contact.headquarters.durbanBranch.country',
      'contact.headquarters.durbanBranch.bldg',
      'contact.headquarters.durbanBranch.address',
      'contact.headquarters.durbanBranch.POBox',
      'contact.headquarters.durbanBranch.telephone',
      'contact.headquarters.durbanBranch.fax',
      'contact.headquarters.durbanBranch.email',

      'contact.headquarters.capTownBranch.country',
      'contact.headquarters.capTownBranch.bldg',
      'contact.headquarters.capTownBranch.address',
      'contact.headquarters.capTownBranch.POBox',
      'contact.headquarters.capTownBranch.telephone',
      'contact.headquarters.capTownBranch.fax',
      'contact.headquarters.capTownBranch.email',
    ];
    return this.translate.get(box1keys).pipe(
      map((translations) => [
        {
          country: translations['contact.headquarters.lebanonBranch.country'],
          bldg: translations['contact.headquarters.lebanonBranch.bldg'],
          address: translations['contact.headquarters.lebanonBranch.address'],
          POBox: translations['contact.headquarters.lebanonBranch.POBox'],
          telephone:
            translations['contact.headquarters.lebanonBranch.telephone'],
          fax: translations['contact.headquarters.lebanonBranch.fax'],
          email: translations['contact.headquarters.lebanonBranch.email'],
        },
        {
          country: translations['contact.headquarters.UAEBranch1.country'],
          bldg: translations['contact.headquarters.UAEBranch1.bldg'],
          address: translations['contact.headquarters.UAEBranch1.address'],
          POBox: translations['contact.headquarters.UAEBranch1.POBox'],
          telephone: translations['contact.headquarters.UAEBranch1.telephone'],
          fax: translations['contact.headquarters.UAEBranch1.fax'],
          email: translations['contact.headquarters.UAEBranch1.email'],
        },
        {
          country: translations['contact.headquarters.UAEBranch2.country'],
          bldg: translations['contact.headquarters.UAEBranch2.bldg'],
          address: translations['contact.headquarters.UAEBranch2.address'],
          POBox: translations['contact.headquarters.UAEBranch2.POBox'],
          telephone: translations['contact.headquarters.UAEBranch2.telephone'],
          fax: translations['contact.headquarters.UAEBranch2.fax'],
          email: translations['contact.headquarters.UAEBranch2.email'],
        },
        {
          country: translations['contact.headquarters.UAEBranch3.country'],
          bldg: translations['contact.headquarters.UAEBranch3.bldg'],
          address: translations['contact.headquarters.UAEBranch3.address'],
          POBox: translations['contact.headquarters.UAEBranch3.POBox'],
          telephone: translations['contact.headquarters.UAEBranch3.telephone'],
          fax: translations['contact.headquarters.UAEBranch3.fax'],
          email: translations['contact.headquarters.UAEBranch3.email'],
        },
        {
          country: translations['contact.headquarters.algeriaBranch1.country'],
          bldg: translations['contact.headquarters.algeriaBranch1.bldg'],
          address: translations['contact.headquarters.algeriaBranch1.address'],
          POBox: translations['contact.headquarters.algeriaBranch1.POBox'],
          telephone:
            translations['contact.headquarters.algeriaBranch1.telephone'],
          fax: translations['contact.headquarters.algeriaBranch1.fax'],
          email: translations['contact.headquarters.algeriaBranch1.email'],
        },
        {
          country: translations['contact.headquarters.algeriaBranch2.country'],
          bldg: translations['contact.headquarters.algeriaBranch2.bldg'],
          address: translations['contact.headquarters.algeriaBranch2.address'],
          POBox: translations['contact.headquarters.algeriaBranch2.POBox'],
          telephone:
            translations['contact.headquarters.algeriaBranch2.telephone'],
          fax: translations['contact.headquarters.algeriaBranch2.fax'],
          email: translations['contact.headquarters.algeriaBranch2.email'],
        },
        {
          country: translations['contact.headquarters.qatarBranch.country'],
          bldg: translations['contact.headquarters.qatarBranch.bldg'],
          address: translations['contact.headquarters.qatarBranch.address'],
          POBox: translations['contact.headquarters.qatarBranch.POBox'],
          telephone: translations['contact.headquarters.qatarBranch.telephone'],
          fax: translations['contact.headquarters.qatarBranch.fax'],
          email: translations['contact.headquarters.qatarBranch.email'],
        },
        {
          country: translations['contact.headquarters.KSABranch.country'],
          bldg: translations['contact.headquarters.KSABranch.bldg'],
          address: translations['contact.headquarters.KSABranch.address'],
          POBox: translations['contact.headquarters.KSABranch.POBox'],
          telephone: translations['contact.headquarters.KSABranch.telephone'],
          fax: translations['contact.headquarters.KSABranch.fax'],
          email: translations['contact.headquarters.KSABranch.email'],
        },
        {
          country: translations['contact.headquarters.moroccoBranch1.country'],
          bldg: translations['contact.headquarters.moroccoBranch1.bldg'],
          address: translations['contact.headquarters.moroccoBranch1.address'],
          POBox: translations['contact.headquarters.moroccoBranch1.POBox'],
          telephone:
            translations['contact.headquarters.moroccoBranch1.telephone'],
          fax: translations['contact.headquarters.moroccoBranch1.fax'],
          email: translations['contact.headquarters.moroccoBranch1.email'],
        },
        {
          country: translations['contact.headquarters.moroccoBranch2.country'],
          bldg: translations['contact.headquarters.moroccoBranch2.bldg'],
          address: translations['contact.headquarters.moroccoBranch2.address'],
          POBox: translations['contact.headquarters.moroccoBranch2.POBox'],
          telephone:
            translations['contact.headquarters.moroccoBranch2.telephone'],
          fax: translations['contact.headquarters.moroccoBranch2.fax'],
          email: translations['contact.headquarters.moroccoBranch2.email'],
        },
        {
          country:
            translations['contact.headquarters.coteDIvoireBranch1.country'],
          bldg: translations['contact.headquarters.coteDIvoireBranch1.bldg'],
          address:
            translations['contact.headquarters.coteDIvoireBranch1.address'],
          POBox: translations['contact.headquarters.coteDIvoireBranch1.POBox'],
          telephone:
            translations['contact.headquarters.coteDIvoireBranch1.telephone'],
          fax: translations['contact.headquarters.coteDIvoireBranch1.fax'],
          email: translations['contact.headquarters.coteDIvoireBranch1.email'],
        },
        {
          country:
            translations['contact.headquarters.coteDIvoireBranch2.country'],
          bldg: translations['contact.headquarters.coteDIvoireBranch2.bldg'],
          address:
            translations['contact.headquarters.coteDIvoireBranch2.address'],
          POBox: translations['contact.headquarters.coteDIvoireBranch2.POBox'],
          telephone:
            translations['contact.headquarters.coteDIvoireBranch2.telephone'],
          fax: translations['contact.headquarters.coteDIvoireBranch2.fax'],
          email: translations['contact.headquarters.coteDIvoireBranch2.email'],
        },
        {
          country:
            translations['contact.headquarters.coteDIvoireBranch3.country'],
          bldg: translations['contact.headquarters.coteDIvoireBranch3.bldg'],
          address:
            translations['contact.headquarters.coteDIvoireBranch3.address'],
          POBox: translations['contact.headquarters.coteDIvoireBranch3.POBox'],
          telephone:
            translations['contact.headquarters.coteDIvoireBranch3.telephone'],
          fax: translations['contact.headquarters.coteDIvoireBranch3.fax'],
          email: translations['contact.headquarters.coteDIvoireBranch3.email'],
        },
        {
          country:
            translations['contact.headquarters.burkinaFasoBranch.country'],
          bldg: translations['contact.headquarters.burkinaFasoBranch.bldg'],
          address:
            translations['contact.headquarters.burkinaFasoBranch.address'],
          POBox: translations['contact.headquarters.burkinaFasoBranch.POBox'],
          telephone:
            translations['contact.headquarters.burkinaFasoBranch.telephone'],
          fax: translations['contact.headquarters.burkinaFasoBranch.fax'],
          email: translations['contact.headquarters.burkinaFasoBranch.email'],
        },
        {
          country: translations['contact.headquarters.beninBranch.country'],
          bldg: translations['contact.headquarters.beninBranch.bldg'],
          address: translations['contact.headquarters.beninBranch.address'],
          POBox: translations['contact.headquarters.beninBranch.POBox'],
          telephone: translations['contact.headquarters.beninBranch.telephone'],
          fax: translations['contact.headquarters.beninBranch.fax'],
          email: translations['contact.headquarters.beninBranch.email'],
        },
        {
          country: translations['contact.headquarters.maliBranch.country'],
          bldg: translations['contact.headquarters.maliBranch.bldg'],
          address: translations['contact.headquarters.maliBranch.address'],
          POBox: translations['contact.headquarters.maliBranch.POBox'],
          telephone: translations['contact.headquarters.maliBranch.telephone'],
          fax: translations['contact.headquarters.maliBranch.fax'],
          email: translations['contact.headquarters.maliBranch.email'],
        },
        {
          country: translations['contact.headquarters.nigerBranch.country'],
          bldg: translations['contact.headquarters.nigerBranch.bldg'],
          address: translations['contact.headquarters.nigerBranch.address'],
          POBox: translations['contact.headquarters.nigerBranch.POBox'],
          telephone: translations['contact.headquarters.nigerBranch.telephone'],
          fax: translations['contact.headquarters.nigerBranch.fax'],
          email: translations['contact.headquarters.nigerBranch.email'],
        },
        {
          country: translations['contact.headquarters.senegalBranch.country'],
          bldg: translations['contact.headquarters.senegalBranch.bldg'],
          address: translations['contact.headquarters.senegalBranch.address'],
          POBox: translations['contact.headquarters.senegalBranch.POBox'],
          telephone:
            translations['contact.headquarters.senegalBranch.telephone'],
          fax: translations['contact.headquarters.senegalBranch.fax'],
          email: translations['contact.headquarters.senegalBranch.email'],
        },
        {
          country: translations['contact.headquarters.togoBranch.country'],
          bldg: translations['contact.headquarters.togoBranch.bldg'],
          address: translations['contact.headquarters.togoBranch.address'],
          POBox: translations['contact.headquarters.togoBranch.POBox'],
          telephone: translations['contact.headquarters.togoBranch.telephone'],
          fax: translations['contact.headquarters.togoBranch.fax'],
          email: translations['contact.headquarters.togoBranch.email'],
        },
        {
          country:
            translations['contact.headquarters.johannesburgBranch.country'],
          bldg: translations['contact.headquarters.johannesburgBranch.bldg'],
          address:
            translations['contact.headquarters.johannesburgBranch.address'],
          POBox: translations['contact.headquarters.johannesburgBranch.POBox'],
          telephone:
            translations['contact.headquarters.johannesburgBranch.telephone'],
          fax: translations['contact.headquarters.johannesburgBranch.fax'],
          email: translations['contact.headquarters.johannesburgBranch.email'],
        },
        {
          country: translations['contact.headquarters.durbanBranch.country'],
          bldg: translations['contact.headquarters.durbanBranch.bldg'],
          address: translations['contact.headquarters.durbanBranch.address'],
          POBox: translations['contact.headquarters.durbanBranch.POBox'],
          telephone:
            translations['contact.headquarters.durbanBranch.telephone'],
          fax: translations['contact.headquarters.durbanBranch.fax'],
          email: translations['contact.headquarters.durbanBranch.email'],
        },
        {
          country: translations['contact.headquarters.capTownBranch.country'],
          bldg: translations['contact.headquarters.capTownBranch.bldg'],
          address: translations['contact.headquarters.capTownBranch.address'],
          POBox: translations['contact.headquarters.capTownBranch.POBox'],
          telephone:
            translations['contact.headquarters.capTownBranch.telephone'],
          fax: translations['contact.headquarters.capTownBranch.fax'],
          email: translations['contact.headquarters.capTownBranch.email'],
        },
      ])
    );
  }

  sectionsList: any = [];

  certificatesList = [
    {
      name: 'SGS_ISO_9001_round_TCL_LR-(104px-104px).jpg',
    },
    {
      name: 'SGS_ISO_14001_with_SAS_logo_TCL_HR-1-(104px-104px).jpg',
    },
    {
      name: 'thumbnail_Untitled-1.jpg',
    },
  ];

  businessLinesSections2List = [
    {
      value: '0',
      label: 'All Projects',
      data: { Id: '0', title: 'All Projects' },
    },
    {
      value: '1',
      label: 'Engineering and Contracting',
      data: { Id: '1', title: 'Engineering and Contracting' },
    },
    {
      value: '2',
      label: 'Electro-Mechanical Solutions',
      data: { Id: '2', title: 'Electro-Mechanical Solutions' },
    },
    {
      value: '3',
      label: 'Facility Services',
      data: { Id: '3', title: 'Facility Services' },
    },
    {
      value: '4',
      label: 'Utility Services',
      data: { Id: '4', title: 'Utility Services' },
    },
  ];

  // loadEngConBoxNumbers(): Observable<any[]> {
  //   const keys = ['']
  // }

  engineeringAndContractingBoxNumbers = [
    {
      boxUsed: '1',
      boxNumber: '9.5',
      boxText: 'Multi-trade Engineering Manhours',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'M+',
    },
    {
      boxUsed: '2',
      boxText: '60',
      boxNumber: 'Global Supplier Network Coverage incl.',
      class1: 'mini-box-text',
      class2: 'mini-box-title1',
      style: 'normal normal bold 25px/40px Bw Gradual !important',
      suffix: '+ Countries',
    },
    {
      boxUsed: '1',
      boxNumber: '200',
      boxText: 'Construction Manhours',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'M+',
    },
    {
      boxUsed: '1',
      boxNumber: '250',
      boxText: 'Achieved in Value Engineering',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'MUSD+',
    },
  ];

  electroMechanicalBoxNumbers = [
    {
      boxUsed: '1',
      boxNumber: '5000',
      boxText: 'of electrical lines installed',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'KM+',
    },
    {
      boxUsed: '1',
      boxNumber: '1500',
      boxText: 'of electrical power installed',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'MW+',
    },
    {
      boxUsed: '1',
      boxNumber: '350',
      boxText:
        'industrial sites completed in industrial electricity, automation, and instrumentation',
      class1: 'mini-box-title',
      class2: 'mini-box-text-EMS',
      style: 'normal normal bold 13px/17px Bw Gradual !important',
      suffix: '+',
    },
    {
      boxUsed: '1',
      boxNumber: '2000',
      boxText: 'of tertiary buildings equipped',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'KM²',
    },
  ];

  facilityBoxNumbers = [
    {
      boxUsed: '1',
      boxNumber: '1200',
      boxText: 'Sites',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '+',
    },
    {
      boxUsed: '1',
      boxNumber: '900',
      boxText: 'Clients served',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '+',
    },
    {
      boxUsed: '1',
      boxNumber: '110',
      boxText: 'Cities covered',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '+',
    },
    {
      boxUsed: '1',
      boxNumber: '800',
      boxText: 'Technicians',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '+',
    },
  ];

  utilityBoxNumbers = [
    {
      boxUsed: '1',
      boxNumber: '50',
      boxText: 'Reduction in Network Losses',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '%',
    },
    {
      boxUsed: '1',
      boxNumber: '90',
      boxText: 'Same-day electrical fault repairs',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '%',
    },
    {
      boxUsed: '1',
      boxNumber: '12',
      boxText: 'M³ of water saved annually',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: 'KM',
    },
    {
      boxUsed: '1',
      boxNumber: '435000',
      boxText: 'M³/day of treated wastewater.',
      class1: 'mini-box-title',
      class2: 'mini-box-text',
      style: 'normal normal bold 32px/40px Bw Gradual',
      suffix: '',
    },
  ];

  branchesList = [
    {
      country: 'Lebanon',
      bldg: 'Butec Tower, Mkalles Square, Beirut, Lebanon',
      POBox: 'P.O. Box 55326, Sin el Fil',
      telephone: 'T. +961 1 512 333',
      fax: 'F. +961 1 512 444',
    },
    {
      country: 'United Arab Emirates',
      bldg: 'Office No. 320, Emirates Financial Towers, North Tower, DIFC, Dubai, UAE',
      POBox: 'P.O. Box 115377, Dubai',
      telephone: 'T. +971 4 3444090',
      fax: 'F. +971 4 3972786',
    },
    {
      country: 'United Arab Emirates',
      bldg: 'Office No. 306, SJ Tower, Airport',
      address: 'Road Abu Dhabi - United Arab Emirates',
      POBox: 'P.O. Box 109829, Abu Dhabi',
      telephone: 'T. +971 2 443 9869',
      fax: 'F. +971 2 443 9852',
    },
    {
      country: 'United Arab Emirates',
      bldg: 'Office No. 104, Arenco Offices Building No. 3',
      address: 'Dubai Investment Park First, Dubai - United Arab Emirates',
      POBox: 'P.O. Box 109829, Abu Dhabi',
      telephone: 'T. +971 2 443 9869',
      fax: 'F. +971 2 443 9852',
    },
    {
      country: 'Algeria',
      bldg: '29 Rue des Pins, Hydra',
      address: 'Algiers',
      POBox: 'P.O. Box 16035',
      telephone: 'T. +213 (0) 671 53 85 70',
    },
    {
      country: 'Algeria',
      bldg: 'Immeuble KPMG',
      address: 'Lot N° 94 Zone d’Affaires, Bab Ezzouar, Algérie',
      telephone: 'T. +213 (0) 661 14 28 25',
    },
    {
      country: 'Qatar',
      bldg: '19th Floor Excellence Tower',
      address: 'Al Shatt Street, Zone 63 Onaiza Area, West Bay, Doha',
      POBox: 'P.O. Box 7340',
      telephone: 'T. +974 4455 2865',
      fax: 'F. +974 4455 2864',
    },
    {
      country: 'Kingdom of Saudi Arabia',
      bldg: 'Hadeel Center, 2nd floor, Office no: 10',
      address: 'Al Yasmin District, King Abdul-Aziz road, Riyadh,',
      telephone: 'P.O. Box 13326',
      fax: 'T. +966112488229',
    },
    {
      country: 'Morocco - Casablanca',
      bldg: 'Route d’El Jadida PK 374-815 (par Lissasfa) km 13,5',
      address:
        'Commune rurale de Oulad Azzou, Province de Nouaceur – 20190 Casablanca',
      POBox: 'P.O. Box 23525, Casablanca',
      telephone: 'T. +212 (0) 522 65 92 00',
      fax: 'F. +212 (0) 520 66 55 93',
    },
    {
      country: 'Morocco - Tanger',
      bldg: 'Bureau n°205, 2ème étage, Sis Centre d’affaires Nordami-Lot 43',
      address: 'ZONE FRANCHE D’EXPORTATION-TANGER',
      telephone: 'T. +212 (0) 522 22 44 23 / 81',
      fax: 'F. +212 (0) 522 29 31 52',
    },
    {
      country: 'Côte D’Ivoire',
      bldg: 'Immeuble Edison, 4ème étage – 18 BP 2179 Abidjan 18',
      address: 'Marcory Zone 4, Rue Thomas Edison',
      telephone: 'T. +225 27 21 75 90 40',
      fax: 'F. +225 27 21 75 47 47',
    },
    {
      country: 'Côte D’Ivoire',
      bldg: 'Parc Technologique Mahatma Gandhi, Bat G BP 855 Zone Franche',
      address: 'Grand-Bassam',
      telephone: 'T. +225 27 21 31 22 18',
    },
    {
      country: 'Côte D’Ivoire',
      bldg: 'Immeuble XL, 6ème étage, Porte 714',
      address: 'Avenue Dr Crozet, Plateau Abidjan, Cote d’Ivoire',
      telephone: 'T. +225 27 20 30 76 38',
      fax: 'F. +225 07 09 71 04 80',
    },
    {
      country: 'Burkina Faso',
      bldg: 'Parcelle N° 20, Lot 61, Section A, 05 BP 6293 Ouaga 05',
      address: 'Ouagadougou, Secteur 15, Avenue Gérard Kango',
      telephone: 'T. +226 25 37 50 56/40',
    },
    {
      country: 'Bénin',
      address: 'Placodji-Kpodji, 5ème Arrondissement, Cotonou, Littoral Bénin',
      telephone: 'T. +229 97 08 32 26',
    },
    {
      country: 'Mali',
      bldg: 'Bamako, Magnambougou, Rue 600, Porte 147,',
      address: 'BP 2821 Bamako, Mali',
      telephone: 'T. +223 20 20 13 25',
    },
    {
      country: 'Niger',
      address:
        'Niamey, Quartier Château I, Avenue du Général C. de Gaulle, Porte 187, Niger',
      telephone: 'T. +88 60 88 79/80 06 50 00',
    },
    {
      country: 'Sénégal',
      bldg: 'Immeuble Seydou Nourou Tall, 1er Étage',
      address: 'Dakar, 66, Boulevard de la Republique',
      telephone: 'T. +221 77 83 13 49',
    },
    {
      country: 'Togo',
      address: 'Lomé, Tokoin Hôpital, Villa 223, Togo 07 BP 12626',
    },
    {
      country: 'South Africa - Johannesburg',
      address: '49 Maple Road, Pomona, Kempton Park, Gauteng, 1619',
      POBox: 'P.O. Box 218, Kempton Park, 1620',
      telephone: 'T. +27 (0) 11 393 9700',
      email: 'bes.sa@buteces.com',
    },
    {
      country: 'South Africa - Durban',
      bldg: 'Unit 1A, Greystones Heliport',
      address: '35 Old North Coast Rd, Glen Anil, Durban, 4051',
      telephone: 'T. +27 (0) 31 569 2010',
      email: 'bes.sa@buteces.com',
    },
    {
      country: 'South Africa - Cape Town',
      address: '33 Lakeshore Drive, Capricorn Park, Muizenberg, 7945',
      telephone: 'T. +27 (0) 21 541 0587',
      email: 'bes.sa@buteces.com',
    },
  ];

  languagesList = [
    { Id: '2', title: 'English' },
    { Id: '3', title: 'French' },
    { Id: '1', title: 'Arabic' },
  ];

  locationsList = [
    { Id: 'Lebanon', title: 'Lebanon' },
    { Id: 'United Arab Emirates', title: 'United Arab Emirates' },
    { Id: 'Qatar', title: 'Qatar' },
    { Id: 'Algeria', title: 'Algeria' },
    { Id: 'Kingdom of Saudi Arabia', title: 'Kingdom of Saudi Arabia' },
    { Id: 'Iraq', title: 'Iraq' },
    { Id: 'Morocco', title: 'Morocco' },
    { Id: 'South Africa', title: 'South Africa' },
    { Id: "Côte d'Ivoire", title: "Côte d'Ivoire" },
    { Id: 'Jordan', title: 'Jordan' },
    { Id: 'Algeria & Qatar', title: 'Algeria & Qatar' },
    { Id: 'Algeria & Lebanon', title: 'Algeria & Lebanon' },
    { Id: 'Benin', title: 'Benin' },
  ];

  businessLinesSectionsList = [
    { Id: '1', title: 'Engineering and Contracting' },
    { Id: '2', title: 'Electro-Mechanical Solutions' },
    { Id: '3', title: 'Facility Services' },
    { Id: '4', title: 'Utility Services' },
  ];

  otherSectionsList = [
    { Id: '5', title: 'News' },
    { Id: '6', title: 'Vacancy' },
    { Id: '7', title: 'Home Image' },
  ];

  expertisesSectionsList = [
    { Id: '8', title: 'Engineering and Contracting Expertise' },
    { Id: '9', title: 'Electro-Mechanical Solutions Expertise' },
    { Id: '10', title: 'Facility Services Expertise' },
    { Id: '11', title: 'Utility Services Expertise' },
  ];

  pagesExcludeFromFloating = [
    '/LoginPage',
    '/Dashboard',
    '/Dashboard/Sections',
    '/Dashboard/Home',
    '/Dashboard/Projects',
    '/Dashboard/News',
    '/Dashboard/Vacancies',
    '/Dashboard/Add-Home',
    '/Dashboard/Add-Project',
    '/Dashboard/Edit-Project',
    '/Dashboard/Add-Vacancy',
    '/Dashboard/Add-News',
    '/Dashboard/Edit-Home',
    '/Dashboard/Edit-News',
    '/Dashboard/Add-Section',
    '/Dashboard/Edit-Section',
    '/Dashboard/Sub-Section',
    '/Dashboard/Edit-Expertise',
    '/Dashboard/Add-Expertise',
    '/Dashboard/Expertises',
    '/Dashboard/Modal-Description',
    '/Dashboard/Translate-Home',
    '/Dashboard/Translate-Project',
    '/Dashboard/Translate-Expertise',
    '/Dashboard/Translate-News',
    '/Dashboard/Translate-Vacancy',
  ];

  // Lists used for routing in header and footer - Declarations Starts here

  businessLinesList = [
    'Electro-Mechanical Solutions',
    'Engineering and Contracting',
    'Facility Services',
    'Utility Services',
  ];

  businessLinesId = ['6', '7', '9', '12'];

  businessLinesOtherProjectsId = ['11', '8', '10', '13'];

  // Lists used for routing in header and footer - Declarations ends here

  public GetExpertiseBoxes(expertiseId: any): any {
    if (expertiseId == 7) {
      return this.engineeringAndContractingBoxNumbers;
    } else if (expertiseId == 6) {
      return this.electroMechanicalBoxNumbers;
    } else if (expertiseId == 9) {
      return this.facilityBoxNumbers;
    } else {
      return this.utilityBoxNumbers;
    }
  }

  public GetSectionslist(): any {
    this.sectionsList.splice(0, this.sectionsList.length);
    for (let element of this.businessLinesSectionsList) {
      this.sectionsList.push(element);
    }
    for (let element of this.otherSectionsList) {
      this.sectionsList.push(element);
    }
    for (let element of this.expertisesSectionsList) {
      this.sectionsList.push(element);
    }
    return this.sectionsList;
  }

  public GetCertificates(): any {
    return this.certificatesList;
  }

  public GetLocations(): any {
    return this.locationsList;
  }

  public GetBranches(): any {
    return this.branchesList;
  }

  public GetBusinessLines(): any {
    return this.businessLinesSectionsList;
  }

  public GetBusinessLines2(): any {
    return this.businessLinesSections2List;
  }

  public GetExpertises(): any {
    return this.expertisesSectionsList;
  }

  public GetLanguages(): any {
    return this.languagesList;
  }

  public GetOtherSections(): any {
    return this.otherSectionsList;
  }

  public DescriptionModal(title: any, description: any) {
    this._modalService
      .show<any>(ModalDescriptionComponent, {
        title: title,
        model: description,
      })
      .result()
      .subscribe((data: any) => {});
  }

  public ConfirmModal(title: any, message: any) {
    this._modalService
      .show<any>(ModalConfirmComponent, {
        title: title,
        model: message,
      })
      .result()
      .subscribe((data: any) => {});
  }

  public GoToPage(pageName: any) {
    for (var i = 0; i < this.businessLinesList.length; i++) {
      if (pageName == this.businessLinesList[i]) {
        var id = this.businessLinesId[i];
        var projectId = this.businessLinesOtherProjectsId[i];
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(
              '/Expertise?expertiseId=' + id + '&sectionProjectId=' + projectId
            );
          });
      }
    }
  }

  public ExcludeFromFloating(pageName: any): any {
    var isIncluded = false;
    for (var i = 0; i < this.pagesExcludeFromFloating.length; i++) {
      if (this.pagesExcludeFromFloating[i] == pageName[0]) {
        isIncluded = true;
        break;
      }
    }
    return isIncluded;
  }

  public changeNavColor: Subject<Object> = new Subject<Object>();
  public navPosition: Subject<Object> = new Subject<Object>();
  SetSession(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  GetSession(key: string): any {
    if (typeof window !== 'undefined') {
      //let retrievedObject = sessionStorage.getItem(key) as string;
      let retrievedObject = localStorage.getItem(key) as string;
      return retrievedObject;
    }
  }

  RemoveFromSession(key: string): any {
    localStorage.removeItem(key);
  }

  clearSession(): void {
    localStorage.clear();
  }

  EscapeJson(list: any) {
    var json = list.replace(/\\/g, '');
    var convertedList = JSON.parse(json);
    return convertedList;
  }

  GetHTMLElementById(elementId: any): any {
    var HTMLId = document.getElementById(elementId) as HTMLInputElement;
    return HTMLId;
  }

  GetHTMLValueById(elementId: any): any {
    var HTMLId = document.getElementById(elementId) as HTMLInputElement;
    return HTMLId.value;
  }

  InputSelectionChange(event: any): any {
    var value = event.target.value;
    return value;
  }

  InputSelection2Change(event: any): any {
    var value = event.options[0].data.Id;
    return value;
  }

  InputSelectionChangeByText(event: any): any {
    var value = event.target.value;
    return value;
  }
}
