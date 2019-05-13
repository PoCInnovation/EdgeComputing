import { format } from 'date-fns';
import { LessThan, MoreThan } from 'typeorm';

const DATE_FORMAT = 'YYYY-MM-DD HH:MM:SS';

export const MoreThanDate = (date: Date) => MoreThan(format(date, DATE_FORMAT));
export const LessThanDate = (date: Date) => LessThan(format(date, DATE_FORMAT));
