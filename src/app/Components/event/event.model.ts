import { Generic } from './../common/generic.model';

export interface Event {
    id ?: number;
    name ?: string;
    description ?: string;
    creationDate ?: Date;
    scheduleDate ?: Date;
    scheduleTime ?: Date;
    duration ?: Date;
    value ?: number;
    coverImage ?: string;
    link ?: string;
    eventCategories ?: Generic[];
    eventStatus ?: Generic;
}

