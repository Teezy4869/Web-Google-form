import { handleRegistrationRequest } from '../server/registrationGateway.js';

export default { fetch: (request) => handleRegistrationRequest(request) };
