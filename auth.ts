import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(7, '密码长度不能小于 7 位'),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const body = JSON.stringify({ username: email, password });
          const result = await fetch('http://localhost:12306/v1/user/login', {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await result.json();
          const isSuccess = data.success;
          if (isSuccess) {
            return {
              id: data.data.id,
              name: data.data.username,
            };
          } else {
            console.error(`无效的凭证 Invalid credentials ${data.message}`);
            return null;
          }
        }

        return null;
      },
    }),
  ],
});
