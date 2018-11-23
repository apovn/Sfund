import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from './payment.service';
import { IReason } from 'app/shared/model/reason.model';
import { ReasonService } from 'app/entities/reason';
import { IMember } from 'app/shared/model/member.model';
import { MemberService } from 'app/entities/member';

@Component({
    selector: 'jhi-payment-update',
    templateUrl: './payment-update.component.html'
})
export class PaymentUpdateComponent implements OnInit {
    payment: IPayment;
    isSaving: boolean;

    reasons: IReason[];

    members: IMember[];
    created: string;
    payDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private paymentService: PaymentService,
        private reasonService: ReasonService,
        private memberService: MemberService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ payment }) => {
            this.payment = payment;
            this.created = this.payment.created != null ? this.payment.created.format(DATE_TIME_FORMAT) : null;
            this.payDate = this.payment.payDate != null ? this.payment.payDate.format(DATE_TIME_FORMAT) : null;
        });
        this.reasonService.query().subscribe(
            (res: HttpResponse<IReason[]>) => {
                this.reasons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.memberService.query().subscribe(
            (res: HttpResponse<IMember[]>) => {
                this.members = res.body;
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
        this.payment.created = this.created != null ? moment(this.created, DATE_TIME_FORMAT) : null;
        this.payment.payDate = this.payDate != null ? moment(this.payDate, DATE_TIME_FORMAT) : null;
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(this.paymentService.create(this.payment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>) {
        result.subscribe((res: HttpResponse<IPayment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReasonById(index: number, item: IReason) {
        return item.id;
    }

    trackMemberById(index: number, item: IMember) {
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
