<form
	method="POST"
	action="?/login"
	class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
>
	<label class="block mb-4">
		<span class="text-gray-700">Email</span>
		<input name="email" type="email" class="mt-1 block w-full border rounded-md p-2" required />
	</label>
	<label class="block mb-4">
		<span class="text-gray-700">Password</span>
		<input
			name="password"
			type="password"
			class="mt-1 block w-full border rounded-md p-2"
			required
		/>
	</label>
	<button type="submit" class="w-full bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 rounded"
		>Login</button
	>
	<button
		formaction="?/signup"
		type="button"
		class="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded"
		>Sign up</button
	>
</form>
