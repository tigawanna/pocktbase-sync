export type LiquorstoreProductsVariants= Array<{
size:number;
price:number;
quantity:number;
}>
export type LiquorstoreProductsReviewVariants= Array<{
size:number;
price:number;
quantity:number;
}>

/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];
// ==== start of liquorstore_categories block =====


export interface LiquorstoreCategoriesResponse extends BaseCollectionResponse {
	collectionName: 'liquorstore_categories';
	name: string;
}

export interface LiquorstoreCategoriesCreate extends BaseCollectionCreate {
	name?: string;
}

export interface LiquorstoreCategoriesUpdate extends BaseCollectionUpdate {
	name?: string;
}

export interface LiquorstoreCategoriesCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'liquorstore_categories';
	response: LiquorstoreCategoriesResponse;
	create: LiquorstoreCategoriesCreate;
	update: LiquorstoreCategoriesUpdate;
	relations: {
		'liquorstore_brands(category)': LiquorstoreBrandsCollection[];
	};
}

// ==== end of liquorstore_categories block =====

// ==== start of liquorstore_brands block =====


export interface LiquorstoreBrandsResponse extends BaseCollectionResponse {
	collectionName: 'liquorstore_brands';
	name: string;
	category: string;
}

export interface LiquorstoreBrandsCreate extends BaseCollectionCreate {
	name: string;
	category: string;
}

export interface LiquorstoreBrandsUpdate extends BaseCollectionUpdate {
	name?: string;
	category?: string;
}

export interface LiquorstoreBrandsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'liquorstore_brands';
	response: LiquorstoreBrandsResponse;
	create: LiquorstoreBrandsCreate;
	update: LiquorstoreBrandsUpdate;
	relations: {
		category: LiquorstoreCategoriesCollection;
		'liquorstore_products(brand)': LiquorstoreProductsCollection[];
	};
}

// ==== end of liquorstore_brands block =====

// ==== start of liquorstore_products block =====


export interface LiquorstoreProductsResponse extends BaseCollectionResponse {
	collectionName: 'liquorstore_products';
	name: string;
	brand: string;
	abv: number;
	availability: 'in_stock' | 'out_of_stock';
	variant?: LiquorstoreProductsVariants
	image: string;
	description: string;
}

export interface LiquorstoreProductsCreate extends BaseCollectionCreate {
	name: string;
	brand: string;
	abv: number;
	availability: 'in_stock' | 'out_of_stock';
	variant?: LiquorstoreProductsVariants
	image: File | null;
	description?: string;
}

export interface LiquorstoreProductsUpdate extends BaseCollectionUpdate {
	name?: string;
	brand?: string;
	abv?: number;
	'abv+'?: number;
	'abv-'?: number;
	availability?: 'in_stock' | 'out_of_stock';
	variant?: LiquorstoreProductsVariants
	image?: File | null;
	description?: string;
}

export interface LiquorstoreProductsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'liquorstore_products';
	response: LiquorstoreProductsResponse;
	create: LiquorstoreProductsCreate;
	update: LiquorstoreProductsUpdate;
	relations: {
		brand: LiquorstoreBrandsCollection;
	};
}

// ==== end of liquorstore_products block =====

// ==== start of liquorstore_product_rating block =====


export interface LiquorstoreProductRatingResponse extends BaseCollectionResponse {
	collectionName: 'liquorstore_product_rating';
	value: number;
	user: string;
}

export interface LiquorstoreProductRatingCreate extends BaseCollectionCreate {
	value?: number;
	user?: string;
}

export interface LiquorstoreProductRatingUpdate extends BaseCollectionUpdate {
	value?: number;
	'value+'?: number;
	'value-'?: number;
	user?: string;
}

export interface LiquorstoreProductRatingCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'liquorstore_product_rating';
	response: LiquorstoreProductRatingResponse;
	create: LiquorstoreProductRatingCreate;
	update: LiquorstoreProductRatingUpdate;
	relations: {
		user: LiquorstoreUserCollection;
	};
}

// ==== end of liquorstore_product_rating block =====

// ==== start of liquorstore_user block =====


export interface LiquorstoreUserResponse extends AuthCollectionResponse {
	collectionName: 'liquorstore_user';
	name: string;
}

export interface LiquorstoreUserCreate extends AuthCollectionCreate {
	name?: string;
}

export interface LiquorstoreUserUpdate extends AuthCollectionUpdate {
	name?: string;
}

export interface LiquorstoreUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'liquorstore_user';
	response: LiquorstoreUserResponse;
	create: LiquorstoreUserCreate;
	update: LiquorstoreUserUpdate;
	relations: {
		'liquorstore_product_rating(user)': LiquorstoreProductRatingCollection[];
	};
}

// ==== end of liquorstore_user block =====

export type Schema = {
	liquorstore_categories: LiquorstoreCategoriesCollection;
	liquorstore_brands: LiquorstoreBrandsCollection;
	liquorstore_products: LiquorstoreProductsCollection;
	liquorstore_product_rating: LiquorstoreProductRatingCollection;
	liquorstore_user: LiquorstoreUserCollection;
};