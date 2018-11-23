/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfundTestModule } from '../../../test.module';
import { MemberDeleteDialogComponent } from 'app/entities/member/member-delete-dialog.component';
import { MemberService } from 'app/entities/member/member.service';

describe('Component Tests', () => {
    describe('Member Management Delete Component', () => {
        let comp: MemberDeleteDialogComponent;
        let fixture: ComponentFixture<MemberDeleteDialogComponent>;
        let service: MemberService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfundTestModule],
                declarations: [MemberDeleteDialogComponent]
            })
                .overrideTemplate(MemberDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MemberDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
