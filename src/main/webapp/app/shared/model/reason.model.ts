import { Moment } from 'moment';
import { IPayment } from 'app/shared/model//payment.model';

export interface IReason {
    id?: number;
    created?: Moment;
    name?: string;
    description?: any;
    info?: any;
    payments?: IPayment[];
}

export class Reason implements IReason {
    constructor(
        public id?: number,
        public created?: Moment,
        public name?: string,
        public description?: any,
        public info?: any,
        public payments?: IPayment[]
    ) {}
}
