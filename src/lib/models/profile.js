import { getSupabaseClient } from '$lib/supabaseClient';
import { Model } from './model';

export class Profile extends Model {
	constructor(userId, email = '', firstName = '', lastName = '', isOnboarded = false) {
		super();

		this.userId = userId;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isOnboarded = isOnboarded;
	}

	async fetch() {
		const supabase = getSupabaseClient();
		const { data: profile, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', this.userId)
			.single();

		if (error) {
			return { error };
		}

		this.email = profile.email;
		this.firstName = profile.first_name;
		this.lastName = profile.last_name;
		this.isOnboarded = profile.is_onboarded;

		return { profile: this.toJSON() };
	}

	async save() {
		const supabase = getSupabaseClient();
		const { error } = await supabase
			.from('profiles')
			.update({
				email: this.email,
				first_name: this.firstName,
				last_name: this.lastName,
				is_onboarded: this.isOnboarded
			})
			.eq('id', this.userId);

		if (error) {
			return { error };
		}

		return this.toJSON();
	}

	async completeOnboarding(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.isOnboarded = true;
		return this.save();
	}

	toJSON() {
		return {
			id: this.userId,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			is_onboarded: this.isOnboarded
		};
	}

	static fromJSON(profile) {
		return new this(
			profile.id,
			profile.email,
			profile.firstName,
			profile.lastName,
			profile.is_onboarded
		);
	}
}
