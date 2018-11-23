import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SfundReasonModule } from './reason/reason.module';
import { SfundMemberModule } from './member/member.module';
import { SfundPaymentModule } from './payment/payment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SfundReasonModule,
        SfundMemberModule,
        SfundPaymentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfundEntityModule {}
