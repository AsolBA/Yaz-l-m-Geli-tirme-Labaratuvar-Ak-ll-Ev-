import { RoleBasedAccessGate } from '../security/RoleBasedAccessGate';

export const authorizeRoles = RoleBasedAccessGate.middleware;
