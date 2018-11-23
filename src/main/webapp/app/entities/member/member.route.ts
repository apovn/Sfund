import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Member } from 'app/shared/model/member.model';
import { MemberService } from './member.service';
import { MemberComponent } from './member.component';
import { MemberDetailComponent } from './member-detail.component';
import { MemberUpdateComponent } from './member-update.component';
import { MemberDeletePopupComponent } from './member-delete-dialog.component';
import { IMember } from 'app/shared/model/member.model';

@Injectable({ providedIn: 'root' })
export class MemberResolve implements Resolve<IMember> {
    constructor(private service: MemberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Member>) => response.ok),
                map((member: HttpResponse<Member>) => member.body)
            );
        }
        return of(new Member());
    }
}

export const memberRoute: Routes = [
    {
        path: 'member',
        component: MemberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member/:id/view',
        component: MemberDetailComponent,
        resolve: {
            member: MemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member/new',
        component: MemberUpdateComponent,
        resolve: {
            member: MemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'member/:id/edit',
        component: MemberUpdateComponent,
        resolve: {
            member: MemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const memberPopupRoute: Routes = [
    {
        path: 'member/:id/delete',
        component: MemberDeletePopupComponent,
        resolve: {
            member: MemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
