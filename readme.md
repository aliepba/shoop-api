## Prerequisite

1. Already installed at least NodeJS v14 on your machine.
2. Already installed and initialize PostgresSQL on your machine.

## Getting Started

1. First, run the development server:

```bash
npm i
```

2. Adjust the .env file, can copy from .env.example, or run this command below:

```bash
cp .env.example .env
```

3. Run migration

```bash
npx sequelize db:migrate
##
npm run db:migrate
```

4. Create folder uploads in root project

```bash
mkdir uploads
```

5. Run the app

```bash
npm run dev
```
