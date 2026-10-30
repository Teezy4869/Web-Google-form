import { handleRegistrationRequest } from '../../server/registrationGateway.js';

export default (request) => handleRegistrationRequest(request);

export const config = { path: '/api/registration' };
