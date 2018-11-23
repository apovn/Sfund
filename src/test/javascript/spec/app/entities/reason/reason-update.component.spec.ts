/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfundTestModule } from '../../../test.module';
import { ReasonUpdateComponent } from 'app/entities/reason/reason-update.component';
import { ReasonService } from 'app/entities/reason/reason.service';
import { Reason } from 'app/shared/model/reason.model';

describe('Component Tests', () => {
    describe('Reason Management Update Component', () => {
        let comp: ReasonUpdateComponent;
        let fixture: ComponentFixture<ReasonUpdateComponent>;
        let service: ReasonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfundTestModule],
                declarations: [ReasonUpdateComponent]
            })
                .overrideTemplate(ReasonUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReasonUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReasonService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Reason(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reason = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Reason();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reason = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
