import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMember } from 'app/shared/model/member.model';

type EntityResponseType = HttpResponse<IMember>;
type EntityArrayResponseType = HttpResponse<IMember[]>;

@Injectable({ providedIn: 'root' })
export class MemberService {
    public resourceUrl = SERVER_API_URL + 'api/members';

    constructor(private http: HttpClient) {}

    create(member: IMember): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(member);
        return this.http
            .post<IMember>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(member: IMember): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(member);
        return this.http
            .put<IMember>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMember>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMember[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(member: IMember): IMember {
        const copy: IMember = Object.assign({}, member, {
            created: member.created != null && member.created.isValid() ? member.created.toJSON() : null,
            birthday: member.birthday != null && member.birthday.isValid() ? member.birthday.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.created = res.body.created != null ? moment(res.body.created) : null;
            res.body.birthday = res.body.birthday != null ? moment(res.body.birthday) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((member: IMember) => {
                member.created = member.created != null ? moment(member.created) : null;
                member.birthday = member.birthday != null ? moment(member.birthday) : null;
            });
        }
        return res;
    }
}
