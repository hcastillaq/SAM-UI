import { ICompany } from './company.interface';

export interface IUser {
	_id?: String;
	email?: String,
	name?: String
	rol?: String
	company?: ICompany
	password?: String
}