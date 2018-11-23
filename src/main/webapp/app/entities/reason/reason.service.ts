import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReason } from 'app/shared/model/reason.model';

type EntityResponseType = HttpResponse<IReason>;
type EntityArrayResponseType = HttpResponse<IReason[]>;

@Injectable({ providedIn: 'root' })
export class ReasonService {
    public resourceUrl = SERVER_API_URL + 'api/reasons';

    constructor(private http: HttpClient) {}

    create(reason: IReason): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reason);
        return this.http
            .post<IReason>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reason: IReason): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reason);
        return this.http
            .put<IReason>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReason>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReason[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(reason: IReason): IReason {
        const copy: IReason = Object.assign({}, reason, {
            created: reason.created != null && reason.created.isValid() ? reason.created.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.created = res.body.created != null ? moment(res.body.created) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((reason: IReason) => {
                reason.created = reason.created != null ? moment(reason.created) : null;
            });
        }
        return res;
    }
}
