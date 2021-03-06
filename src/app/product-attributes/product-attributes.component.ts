import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import { TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnInit {

  @Input()data: string;
  selecteditem: any;
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  compositionPart: any = [];
  emptyProduct: string;
  compostionCheck: string;
  compositionLegalTypes = false;
  compositionHunderdTypes = false;
  compositionStandardTypes = true;
  compositionINCI = false;
  value: string;
  type: string;
  modeselect = 'Legal Composition';
  items: string[];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
/*Product Attributes */
  productAttributesCheck = 'Basic Information'
  productAttributeCheck: any = [];
  primaryInformtionTypes = true;
  ghsLabeling = false;
  structureAndFormulaTypes = false;
  compositionTypes = false;
  flowDiagrams = false;
  cols: any[];
  legalProducts: any[];
  selectedlegalProducts: any[];
  selectedColumns: any[];

      // GHS Labeling
      ghsLabelingData: any[];
      ghsLabelingHeader: any[];
      selectedLabelingProducts: any[];
      selectedLabelingColumns: any[];
      legalpaginator = false;
      private colsTempor: any[] = [];
      public columnOptions: any[];

 // Composition Data
  legalCompositionData: any[];
  legalCompositionHead: any[];
  selectedlegalCompositionProducts: any[];
  hunderedCompositionHead: any[];
  hunderedCompositionData: any[];
  copyhunderedCompositionData: any[];
  selectedhunderedCompositionProducts: any[];
  standardCompositionHead: any[];
  standardCompositionData: any[];
  copystandardCompositionData: any[];
  copylegalCompositionData: any[];
  selectedStandardCompositionProducts: any[];
  ExcelStandardData = [];
  ExcelStandardSubData = [];
  newStandardData = [];
  radiovalue: any;
  productData: any = [];
  productApplication: any = [];
  objectKeys = Object.keys;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private momentiveService: MomentiveService,
               ) {

    }
    ngOnInit() {
      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        console.log(this.selecteditem);
        if (this.selecteditem) {
          setTimeout(() => {
            this.onChangeProductAttribute(this.selecteditem);
         }, 0);
       }
      });

 
    // product_type
      this.momentiveService.getSearchData().subscribe(data => {      
      this.productData = data;
      this.product_type = this.productData.product_type;
      console.log(this.product_type);
    }, err => {
      console.error(err);
    });
      // compositionPart
      this.momentiveService.getSearchData().subscribe(data => {
        this.productData = data;
        this.compositionPart = this.productData.compositionPart;
        console.log(this.compositionPart);
      }, err => {
        console.error(err);
      });
      // ProductAttributeCheck
      this.momentiveService.getSearchData().subscribe(data => {
        this.productData = data;
        console.log(this.productData);
        this.productAttributeCheck = this.productData.productAttributeCheck;
        console.log(this.productAttributeCheck);
      }, err => {
        console.error(err);
      });
  // cols
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.cols = this.productData.cols;
    console.log(this.cols);
  }, err => {
    console.error(err);
  });
  // legalProducts
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.legalProducts = this.productData.legalProducts;
    console.log(this.legalProducts);
  }, err => {
    console.error(err);
  });

  // ghsLabelingHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.ghsLabelingHeader = this.productData.ghsLabelingHeader;
    console.log(this.ghsLabelingHeader);
  }, err => {
    console.error(err);
  });
  // ghsLabelingData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.ghsLabelingData = this.productData.ghsLabelingData;
    console.log(this.ghsLabelingData);
  }, err => {
    console.error(err);
  });

  // legalCompositionHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.legalCompositionHead = this.productData.legalCompositionHead;
    console.log(this.legalCompositionHead);
  }, err => {
    console.error(err);
  });
  // legalCompositionData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.legalCompositionData = this.productData.legalCompositionData;
    console.log(this.legalCompositionData);
  }, err => {
    console.error(err);
  });
  // hunderedCompositionHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.hunderedCompositionHead = this.productData.hunderedCompositionHead;
    console.log(this.hunderedCompositionHead);
  }, err => {
    console.error(err);
  });
  // hunderedCompositionData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.hunderedCompositionData = this.productData.hunderedCompositionData;
    console.log(this.hunderedCompositionData);
  }, err => {
    console.error(err);
  });
  // standardCompositionHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.standardCompositionHead = this.productData.standardCompositionHead;
    console.log(this.standardCompositionHead);
  }, err => {
    console.error(err);
  });
  // standardCompositionData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productData = data;
    this.standardCompositionData = this.productData.standardCompositionData;
    console.log(this.standardCompositionData);
    /* Excel Report for Standard Composition */
    let tempExcelStandardSubData = '';
    console.log(this.standardCompositionData);
    this.standardCompositionData.forEach(obj => {
        tempExcelStandardSubData = '';
        obj.Component_Name.forEach(componentNew => {
              tempExcelStandardSubData += ' CAS Name:' + componentNew.cas_name + ' IUPAC Name:' + componentNew.iupac_name + ' INCI Name:' + componentNew.INCI_Name;
            });
        this.ExcelStandardData.push({
          'Component Type': obj.ComponentType,
          'Component Id': obj.Component_Id,
          'Case Number': obj.CAS_Number,
          'Value in %': obj.Value,
          'Component Name': tempExcelStandardSubData
      });
      });
  }, err => {
    console.error(err);
  });

      this.copylegalCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002925',
        CAS_Number: '68083-19-2',
        Component_Name: [
          {cas_name: 'Decamethylcyclopentasiloxane',
          iupac_name: 'Cyclopentasiloxane, decamethyl-',
          INCI_Name: ['CYCLOPENTASILOXANE'],
        }],
          Value: '86%'
      },
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002670',
        CAS_Number: '556-67-2',
        Component_Name: [
          {cas_name: 'Octamethylcyclotetrasiloxane',
           iupac_name: 'Cyclotetrasiloxane, octamethyl-',
          INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
        }],
          Value: '14%'
      }
   ];
      this.copyhunderedCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002766',
        CAS_Number: '68083-19-2',
        Component_Name: [
          {cas_name: 'Slica',
          iupac_name: 'Slica',
          INCI_Name: ['slica', 'SOLUM DIATOMEAE'],
        }],
          Value: '29.85%'
      },
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002652',
        CAS_Number: '999-97-3',
        Component_Name: [
          {cas_name: 'Hexamethyldisilazane',
           iupac_name: 'Silanamine 1,1,1-trimethyl-N-(trimethylsilyl)-',
        }],
          Value: '6.62%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002932',
        CAS_Number: '7691-02-3',
        Component_Name: [
          {cas_name: 'Divinyltetramethyldisilazane',
          iupac_name: '1,3-Divinyltetramethyldisilazane',
        }],
        Value: '1.24%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002670',
        CAS_Number: '556-67-2',
        Component_Name: [
          {cas_name: 'Octamethylcyclotetrasiloxane',
          iupac_name: 'Cyclotetrasiloxane, octamethyl-',
          INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
        }],
        Value: '0.12%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000003091',
        CAS_Number: '2627-95-4',
        Component_Name: [
          {cas_name: 'Divinyltetramethyldisiloxane',
           iupac_name: 'DISILOXANE, 1,3-DIETHINYL-1,1,3,3-TETRAMETHYL-',
        }],
        Value: '0.12%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002678',
        CAS_Number: '2554-06-5',
        Component_Name: [
          {cas_name: 'Cyclotetrasiloxane, 2,4,6,8-tetraethenyl-2,4,6,8-tetramethyl-',
           iupac_name: 'CYCLOTETRASILOXANE, 2,4,6,8-TETRAETHYLENE-2,4,6,8-TETRAMETHYL-',
        }],
        Value: '0.53%'
      }
   ];
      this.copystandardCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002925',
        CAS_Number: '68083-19-2',
        Component_Name: [
          { cas_name: 'Decamethylcyclopentasiloxane',
           iupac_name: 'Cyclopentasiloxane decamethyl-',
          INCI_Name: ['CYCLOPENTASILOXANE'],
        }],
          Value: '84.06%'
      },
      {
        ComponentType: 'Impurity',
        Component_Id: '000000002681',
        CAS_Number: '70131-67-8',
        Component_Name: [
          { cas_name: 'Siloxanes and Silicones, di-Me hydroxy terminated',
           iupac_name: 'Dimethylpolysiloxane',
        }],
          Value: '15%'
      }, {
        ComponentType: 'Impurity',
        Component_Id: '000000003060',
        CAS_Number: '540-97-6',
        Component_Name: [
          {cas_name: 'Dodecamethylcyclohexasiloxane',
          iupac_name: 'Cyclohexasiloxane Dodecamethyl-',
          INCI_Name: ['CYCLOHEXASILOXANE'],
        }],
        Value: '2.1%'
      }, {
        ComponentType: 'Impurity',
        Component_Id: '000000002932',
        CAS_Number: '556-67-2',
        Component_Name: [
          {cas_name: 'Octamethylcyclotetrasiloxane',
          iupac_name: 'Cyclotetrasiloxane, octamethyl-',
          INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
        }],
        Value: '0.704 %'
      }
     ];
    this.productApplication = [
      { app_id: 1, app_text: 'Dental / surgical devices' },
      { app_id: 2, app_text: 'Diagnostics / imaging' },
      { app_id: 3, app_text: 'Fluid and drug delivery devices' },
      { app_id: 4, app_text: 'Orthopedics / prosthetics' },
      { app_id: 5, app_text: 'Advanced Wound Care & Scar Management' },
      { app_id: 6, app_text: 'Septa / stoppers / laboratory accessories' },
      { app_id: 7, app_text: 'Wound drains and bulbs' },
      { app_id: 8, app_text: 'Sterilization mats' },
      { app_id: 9, app_text: 'Pharmaceutical closures' },
      { app_id: 10, app_text: 'Positioning devicess' },
      { app_id: 11, app_text: 'Catheters' },
      { app_id: 12, app_text: 'Seals / dialysis o-rings / valves' },
      { app_id: 13, app_text: 'Respiratory / anesthesia' },
      { app_id: 14, app_text: 'Medical equipment keypads' },
    ];
}
    CompositionTypes(value) {
      this.compostionCheck = value;
   }
  selectItem(index, data, radiodata): void {
    this.selectedId = index;
    this.value = data;
    this.radiovalue = radiodata;
  }
onChangeProductAttribute(item) {
  this.productAttributesCheck = item;
  if ( this.productAttributesCheck === 'Basic Information') {
      this.primaryInformtionTypes = true;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = false;
    } else if ( this.productAttributesCheck === 'GHS Labeling') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = true;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = false;
    } else if (this.productAttributesCheck === 'Structures and Formulas') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = true;
      this.compositionTypes = false;
      this.flowDiagrams = false;
    } else if (this.productAttributesCheck === 'Composition') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = true;
      this.flowDiagrams = false;
    } else if (this.productAttributesCheck === 'Flow Diagrams') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = true;
    }
  }
compositionProcess(value) {
     this.compostionCheck = value;
     if (this.compostionCheck === 'legal') {
      this.compositionLegalTypes = true;
      this.compositionHunderdTypes = false;
      this.compositionStandardTypes = false;
      this.compositionINCI = false;
    } else if (this.compostionCheck === 'hundered') {
      this.compositionLegalTypes = false;
      this.compositionHunderdTypes = true;
      this.compositionStandardTypes = false;
      this.compositionINCI = false;
    } else if (this.compostionCheck === 'standard') {
      this.compositionLegalTypes = false;
      this.compositionHunderdTypes = false;
      this.compositionStandardTypes = true;
      this.compositionINCI = false;
    } else if (this.compostionCheck === 'inci') {
      this.compositionLegalTypes = false;
      this.compositionHunderdTypes = false;
      this.compositionStandardTypes = false;
      this.compositionINCI = true;
    }
  }
customSort(event) {
    event.data.sort((data1, data2) => {
        const value1 = data1[event.field];
        const value2 = data2[event.field];
        const result = null;

        if (value1 == null && value2 != null) {
            const result = -1;
        } else if (value1 != null && value2 == null) {
          const result = 1;
        } else if (value1 == null && value2 == null) {
          const result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          const  result = value1.localeCompare(value2);
         } else {
          const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
 }
        return (event.order * result);
    });
}
setMyStyles() {
    const styles = {
      position: this.product_type.length > 16 ? 'absolute' : 'none',
    };
    return styles;
  }

onItemSelect(item: any) {
    console.log(item);
}
OnItemDeSelect(item: any) {
    console.log(item);
}
onSelectAll(items: any) {
    console.log(items);
}
onDeSelectAll(items: any) {
    console.log(items);
}

getAddressData() {
  this.momentiveService.getSearchData().subscribe(data => {
    this.product_Name = data;
    console.log(this.product_Name);
  }, err => {
    console.error(err);
  });
}


}
