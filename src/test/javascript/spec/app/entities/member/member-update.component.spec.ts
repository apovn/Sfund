/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfundTestModule } from '../../../test.module';
import { MemberUpdateComponent } from 'app/entities/member/member-update.component';
import { MemberService } from 'app/entities/member/member.service';
import { Member } from 'app/shared/model/member.model';

describe('Component Tests', () => {
    describe('Member Management Update Component', () => {
        let comp: MemberUpdateComponent;
        let fixture: ComponentFixture<MemberUpdateComponent>;
        let service: MemberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfundTestModule],
                declarations: [MemberUpdateComponent]
            })
                .overrideTemplate(MemberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MemberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Member(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.member = entity;
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
                    const entity = new Member();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.member = entity;
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
