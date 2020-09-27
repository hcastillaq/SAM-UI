import { ICompany } from './company.interface';
import { IUser } from './user.interface';

export interface ITransaction {
	_id?: String;
	description?: String;
	mount?: Number;
	date?: String,
	company?: ICompany,
	user?: IUser,
	type?: String
}