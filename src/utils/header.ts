export const setHeaders = (
  req: { cookies: { [key: string]: string | undefined } },
  useAuthorization: boolean = true,
  isPerm: boolean = false
): Record<string, string> => {
  const header: Record<string, string> = {
    'Accept-Language': req.cookies.NEXT_LOCALE ?? 'mn',
  };

  if (useAuthorization) {
    const token = isPerm ? req.cookies?.perm : req.cookies?.auth;
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }
  }

  return header;
};
