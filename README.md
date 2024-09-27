# nitin

## Developing

### Prerequisites

Before beginning development, ensure the following software is installed:

- [Node.js](https://nodejs.org/en)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

Once the prerequisite software is installed, you may install the necessary project dependencies.

```bash
npm install
```

### Configure the Local Environment

To begin development, set up your local environment by copying the example environment configuration file:

```bash
cp .env.example .env.local
```

Start Docker Desktop and then initiate Supabase locally:

```bash
supabase start
```

After the Supabase services have started, copy your Supabase anon key into the .env.local file:

```bash
#.env.local
PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
PUBLIC_SUPABASE_ANON_KEY="<supabase_anon_key>"
```

### Starting the Development Server

To start the development server with hot code reloading capabilities, use the following command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
