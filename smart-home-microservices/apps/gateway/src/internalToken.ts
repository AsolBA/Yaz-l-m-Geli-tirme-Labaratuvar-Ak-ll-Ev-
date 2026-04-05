export const internalServiceHeaders = (): Record<string, string> => {
  const token = process.env.INTERNAL_SERVICE_TOKEN;
  if (!token?.trim()) {
    throw new Error('INTERNAL_SERVICE_TOKEN is required');
  }
  return {
    'X-Internal-Token': token
  };
};
