import { QwikAuth$ } from "@auth/qwik";
import Credentials from "@auth/qwik/providers/credentials";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email" },
          password: { label: "Password", type: "password" },
        },
        async authorize() {
          const response = {
            ok: true,
            status: 200,
            json: async () => {
              return {
                id: "123",
                name: "John Doe",
                email: null,
                image: null,
              };
            },
          };

          if (!response.ok) return null;
          return (await response.json()) ?? null;
        },
      }),
    ],
  }),
);
