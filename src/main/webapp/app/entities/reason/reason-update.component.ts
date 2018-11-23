import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IReason } from 'app/shared/model/reason.model';
import { ReasonService } from './reason.service';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment';

@Component({
    selector: 'jhi-reason-update',
    templateUrl: './reason-update.component.html'
})
export class ReasonUpdateComponent implements OnInit {
    reason: IReason;
    isSaving: boolean;

    payments: IPayment[];
    created: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private reasonService: ReasonService,
        private paymentService: PaymentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reason }) => {
            this.reason = reason;
            this.created = this.reason.created != null ? this.reason.created.format(DATE_TIME_FORMAT) : null;
        });
        this.paymentService.query().subscribe(
            (res: HttpResponse<IPayment[]>) => {
                this.payments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.reason.created = this.created != null ? moment(this.created, DATE_TIME_FORMAT) : null;
        if (this.reason.id !== undefined) {
            this.subscribeToSaveResponse(this.reasonService.update(this.reason));
        } else {
            this.subscribeToSaveResponse(this.reasonService.create(this.reason));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReason>>) {
        result.subscribe((res: HttpResponse<IReason>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPaymentById(index: number, item: IPayment) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
