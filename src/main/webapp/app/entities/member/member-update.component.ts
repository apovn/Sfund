import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IMember } from 'app/shared/model/member.model';
import { MemberService } from './member.service';

@Component({
    selector: 'jhi-member-update',
    templateUrl: './member-update.component.html'
})
export class MemberUpdateComponent implements OnInit {
    member: IMember;
    isSaving: boolean;
    created: string;
    birthdayDp: any;

    constructor(private dataUtils: JhiDataUtils, private memberService: MemberService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ member }) => {
            this.member = member;
            this.created = this.member.created != null ? this.member.created.format(DATE_TIME_FORMAT) : null;
        });
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
        this.member.created = this.created != null ? moment(this.created, DATE_TIME_FORMAT) : null;
        if (this.member.id !== undefined) {
            this.subscribeToSaveResponse(this.memberService.update(this.member));
        } else {
            this.subscribeToSaveResponse(this.memberService.create(this.member));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMember>>) {
        result.subscribe((res: HttpResponse<IMember>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
