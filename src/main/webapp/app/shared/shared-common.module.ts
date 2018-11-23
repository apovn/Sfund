import { NgModule } from '@angular/core';

import { SfundSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SfundSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SfundSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SfundSharedCommonModule {}
