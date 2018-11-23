import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPayment } from 'app/shared/model/payment.model';

type EntityResponseType = HttpResponse<IPayment>;
type EntityArrayResponseType = HttpResponse<IPayment[]>;

@Injectable({ providedIn: 'root' })
export class PaymentService {
    public resourceUrl = SERVER_API_URL + 'api/payments';

    constructor(private http: HttpClient) {}

    create(payment: IPayment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(payment);
        return this.http
            .post<IPayment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(payment: IPayment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(payment);
        return this.http
            .put<IPayment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(payment: IPayment): IPayment {
        const copy: IPayment = Object.assign({}, payment, {
            created: payment.created != null && payment.created.isValid() ? payment.created.toJSON() : null,
            payDate: payment.payDate != null && payment.payDate.isValid() ? payment.payDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.created = res.body.created != null ? moment(res.body.created) : null;
            res.body.payDate = res.body.payDate != null ? moment(res.body.payDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((payment: IPayment) => {
                payment.created = payment.created != null ? moment(payment.created) : null;
                payment.payDate = payment.payDate != null ? moment(payment.payDate) : null;
            });
        }
        return res;
    }
}
