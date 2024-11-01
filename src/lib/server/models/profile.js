export async function getProfile(supabase, id) {
	return supabase.from('profiles').select().eq('id', id).single();
}

export async function saveProfile(supabase, data) {
	return supabase
		.from('profiles')
		.update({
			...data
		})
		.eq('id', data.id);
}

export async function onboardProfile(supabase, id, first_name, last_name) {
	const date = new Date().toISOString();
	const colors = [
		'#ef4444', // red-500
		'#f97316', // orange-500
		'#eab308', // yellow-500
		'#22c55e', // green-500
		'#14b8a6', // teal-500
		'#0ea5e9', // sky-500
		'#3b82f6', // blue-500
		'#a855f7', // purple-500
		'#ec4899' // pink-500
	];

	return supabase
		.from('profiles')
		.update({
			first_name,
			last_name,
			avatar_color: colors[Math.floor(Math.random() * colors.length)],
			is_onboarded: true,
			onboarded_at: date,
			updated_at: date
		})
		.eq('id', id);
}
