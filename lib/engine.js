import { executeMarketing } from './modules/marketing';
import { executeWebsite } from './modules/web';

export const runService = async (service, input) => {
  console.log(`⚙️ Engine processing: ${service}`);
  
  switch (service) {
    case 'marketing':
      return executeMarketing(input);
    case 'web':
      return executeWebsite(input);
    default:
      return `Service ${service} is recognized but not yet automated. Contact Denis Kipkoech for manual override.`;
  }
};
