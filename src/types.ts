export interface UserBasicInfo {
	_id?: string;
	firstName: string;
	lastName: string;
	gender: string;
	birthdate: string;
	avatar?: string;
	address?: {
		city?: string;
		street?: string;
		postalCode?: string;
	};
	seller?: {
		isBanned: boolean;
		bannedReason?: string;
		bannedUntil?: string;
	};
	buyer?: {
		isBanned: boolean;
		bannedReason?: string;
		bannedUntil?: string;
	};
}

export interface Credentials {
	email: string;
	password?: string;
}

export interface User extends UserBasicInfo, Credentials {}
