import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reason } from 'app/shared/model/reason.model';
import { ReasonService } from './reason.service';
import { ReasonComponent } from './reason.component';
import { ReasonDetailComponent } from './reason-detail.component';
import { ReasonUpdateComponent } from './reason-update.component';
import { ReasonDeletePopupComponent } from './reason-delete-dialog.component';
import { IReason } from 'app/shared/model/reason.model';

@Injectable({ providedIn: 'root' })
export class ReasonResolve implements Resolve<IReason> {
    constructor(private service: ReasonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reason> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Reason>) => response.ok),
                map((reason: HttpResponse<Reason>) => reason.body)
            );
        }
        return of(new Reason());
    }
}

export const reasonRoute: Routes = [
    {
        path: 'reason',
        component: ReasonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reasons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reason/:id/view',
        component: ReasonDetailComponent,
        resolve: {
            reason: ReasonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reasons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reason/new',
        component: ReasonUpdateComponent,
        resolve: {
            reason: ReasonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reasons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reason/:id/edit',
        component: ReasonUpdateComponent,
        resolve: {
            reason: ReasonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reasons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reasonPopupRoute: Routes = [
    {
        path: 'reason/:id/delete',
        component: ReasonDeletePopupComponent,
        resolve: {
            reason: ReasonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reasons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
