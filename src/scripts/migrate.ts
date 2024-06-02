import { resolve } from 'path';
import { execSync } from 'child_process';

// Resolve paths to configuration and Sequelize CLI
const configPath = resolve(__dirname, '../src/config/config.ts');
const sequelizeCliPath = resolve(__dirname, '../node_modules/.bin/sequelize-cli');

// Set the NODE_ENV to the desired environment or default to development
const env = process.env.NODE_ENV || 'development';

// Build the command to run the migration
const command = `${sequelizeCliPath} db:migrate --config ${configPath} --env ${env}`;

try {
  // Execute the command
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}
