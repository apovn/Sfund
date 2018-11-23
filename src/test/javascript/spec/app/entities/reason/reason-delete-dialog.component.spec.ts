/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfundTestModule } from '../../../test.module';
import { ReasonDeleteDialogComponent } from 'app/entities/reason/reason-delete-dialog.component';
import { ReasonService } from 'app/entities/reason/reason.service';

describe('Component Tests', () => {
    describe('Reason Management Delete Component', () => {
        let comp: ReasonDeleteDialogComponent;
        let fixture: ComponentFixture<ReasonDeleteDialogComponent>;
        let service: ReasonService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfundTestModule],
                declarations: [ReasonDeleteDialogComponent]
            })
                .overrideTemplate(ReasonDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReasonDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReasonService);
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
