import { redirect } from '@sveltejs/kit';

export async function load({ data, fetch, url }) {
	const response = await fetch('/profile', {
		method: 'GET'
	});

	const { data: profile, error } = await response.json();
	if (error) {
		error(500, { message: 'Unable to fetch profile' });
	}

	if (!profile.is_onboarded && !url.pathname.startsWith('/onboarding')) {
		redirect(303, `/onboarding?next=${url.pathname}`);
	}

	return {
		...data,
		profile
	};
}
