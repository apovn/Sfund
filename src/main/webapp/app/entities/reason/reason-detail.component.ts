import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IReason } from 'app/shared/model/reason.model';

@Component({
    selector: 'jhi-reason-detail',
    templateUrl: './reason-detail.component.html'
})
export class ReasonDetailComponent implements OnInit {
    reason: IReason;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reason }) => {
            this.reason = reason;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
