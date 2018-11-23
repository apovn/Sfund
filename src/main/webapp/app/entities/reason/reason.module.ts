import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfundSharedModule } from 'app/shared';
import {
    ReasonComponent,
    ReasonDetailComponent,
    ReasonUpdateComponent,
    ReasonDeletePopupComponent,
    ReasonDeleteDialogComponent,
    reasonRoute,
    reasonPopupRoute
} from './';

const ENTITY_STATES = [...reasonRoute, ...reasonPopupRoute];

@NgModule({
    imports: [SfundSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ReasonComponent, ReasonDetailComponent, ReasonUpdateComponent, ReasonDeleteDialogComponent, ReasonDeletePopupComponent],
    entryComponents: [ReasonComponent, ReasonUpdateComponent, ReasonDeleteDialogComponent, ReasonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfundReasonModule {}
