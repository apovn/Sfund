import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfundSharedModule } from 'app/shared';
import {
    MemberComponent,
    MemberDetailComponent,
    MemberUpdateComponent,
    MemberDeletePopupComponent,
    MemberDeleteDialogComponent,
    memberRoute,
    memberPopupRoute
} from './';

const ENTITY_STATES = [...memberRoute, ...memberPopupRoute];

@NgModule({
    imports: [SfundSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MemberComponent, MemberDetailComponent, MemberUpdateComponent, MemberDeleteDialogComponent, MemberDeletePopupComponent],
    entryComponents: [MemberComponent, MemberUpdateComponent, MemberDeleteDialogComponent, MemberDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfundMemberModule {}
