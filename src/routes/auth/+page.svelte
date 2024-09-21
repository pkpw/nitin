<!--<form
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
</form> -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Login</title>
</head>

<body class="flex flex-col items-center justify-center min-h-screen bg-gray-100" 
style="background-image: url('https://www.shutterstock.com/image-illustration/abstract-dark-blue-background-flat-260nw-519750616.jpg');
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;">
	   
	<p class="text-white text-3xl font-bold text-center">Study Smarter Today.</p>

<form
	method="POST"
	action="?/login"
	class="mt-3 px-20 py-11 border-2 border-gray-400 bg-black bg-opacity-75 border-solid border-grey-300 rounded-md max-w-md"
	>
	<label class="block mb-4">
		<input name="email" type="email" placeholder="name@school.edu"
		class="bg-gray-500 bg-opacity-60 block w-full border-0 rounded-md p-2 text-white placeholder:text-gray-300" required />
	</label>

	<div class="flex justify-center">
		<a href="/emailconfirm" class="px-16 py-1 bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-full">
			continue with email
		</a>
	</div>

	<p class="text-center text-gray-500">OR</p>

	<button type="submit" class="w-full bg-white hover:bg-gray-400 text-black py-2 mb-2"
		>continue with google
	</button>
	<button type="submit" class="w-full bg-white hover:bg-gray-400 text-black py-2 mb-2"
		>continue with apple
	</button>
	<button type="submit" class="w-full bg-white hover:bg-gray-400 text-black py-2 mb-2"
		>continue with microsoft
	</button>

	<p class="text-gray-500 text-center">By clicking continue, 
		you acknowledge and agree to the 
		<a href="/terms-of-service" class="text-blue-500 hover:text-blue-600 underline">Terms of Service</a> 
		and 
		<a href="/privacy-policy" class="text-blue-500 hover:text-blue-600 underline">Privacy Policy</a>.
	</p>
</form>
</body>
