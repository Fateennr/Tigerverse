export async function login(req, res) {
  const result = await service.login(req.body);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,          // true in production (HTTPS)
    sameSite: 'lax',    // or 'lax' if needed
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  });

  res.json({
    accessToken: result.accessToken
  });
}

export async function refresh(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  const result = await service.refresh({
    refreshToken: token
  });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30
  });

  res.json({
    accessToken: result.accessToken
  });
}

export async function logout(req, res) {
  const token = req.cookies.refreshToken;

  if (token) {
    await service.logout(token);
  }

  res.clearCookie('refreshToken');

  res.json({ message: 'Logged out' });
}