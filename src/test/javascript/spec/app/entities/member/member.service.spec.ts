/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MemberService } from 'app/entities/member/member.service';
import { IMember, Member } from 'app/shared/model/member.model';

describe('Service Tests', () => {
    describe('Member Service', () => {
        let injector: TestBed;
        let service: MemberService;
        let httpMock: HttpTestingController;
        let elemDefault: IMember;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MemberService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Member(0, currentDate, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0, 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        created: currentDate.format(DATE_TIME_FORMAT),
                        birthday: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Member', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        created: currentDate.format(DATE_TIME_FORMAT),
                        birthday: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        created: currentDate,
                        birthday: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Member(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Member', async () => {
                const returnedFromService = Object.assign(
                    {
                        created: currentDate.format(DATE_TIME_FORMAT),
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        birthday: currentDate.format(DATE_FORMAT),
                        phone: 1,
                        currentAmount: 1,
                        totalAmount: 1,
                        info: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        created: currentDate,
                        birthday: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Member', async () => {
                const returnedFromService = Object.assign(
                    {
                        created: currentDate.format(DATE_TIME_FORMAT),
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        birthday: currentDate.format(DATE_FORMAT),
                        phone: 1,
                        currentAmount: 1,
                        totalAmount: 1,
                        info: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        created: currentDate,
                        birthday: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Member', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
