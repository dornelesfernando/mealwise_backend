import bcrypt from 'bcryptjs';

/**
 * Generate a hash from a password string.
 * @param password - The password in plain text.
 * @returns hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
