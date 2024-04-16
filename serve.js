const { exec } = require('child_process');

// Parse command-line arguments
const args = process.argv.slice(2);
const appName = args[0] || 'user'; /* user, crm, admin */
const command = args[1] || 'serve'; /* serve, build */
const environment = args[2] || 'dev'; /* dev, sit, prod */

// "user": "nx serve fintech-user",
// "crm": "nx serve fintech-crm",
// "admin": "nx serve fintech-admin",
// nx serve fintech-user --configuration=staging --verbose

// Validate input
if (!appName || !environment || !command) {
  console.error('Please provide an application name and environment.');
  console.error('Usage: pnpm run build-app <app-name> <environment>');
  process.exit(1);
}

let nxCommand = 'nx';

/* Assign command dynamically */
switch (command) {
  case 'build':
    nxCommand += ' build';
    break;

  default:
    nxCommand += ' serve';
    break;
}

/* Assign appName input dynamically */
switch (appName) {
  case 'crm':
    nxCommand += ' fintech-crm';
    break;

  case 'admin':
    nxCommand += ' fintech-admin';
    break;

  default:
    nxCommand += ' fintech-user';
    break;
}

/* Assign appName input dynamically */
switch (environment) {
  case 'sit':
    nxCommand += ' --configuration=staging';
    break;

  case 'prod':
    nxCommand += ' --configuration=production';
    break;

  default:
    nxCommand += ' --configuration=development';
    break;
}

/* To see the verbose */
nxCommand += ' --verbose';

// Execute the build command
exec(nxCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error occurred during the build: ${error.message}`);
    process.exit(1);
  }

  // Output build logs
  console.log(
    `Building application: ${appName} in environment: ${environment}`
  );
  console.log(stdout);
  console.error(stderr);
});
