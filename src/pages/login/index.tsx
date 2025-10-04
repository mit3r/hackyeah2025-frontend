import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  return (
    <div className="mx-auto flex h-svh max-w-2xl flex-col items-center justify-center gap-4">
      <h1 className="my-12 text-4xl">Witaj w aplikacji HY25!</h1>
      <h2>Aby przejść dalej zaloguj się.</h2>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />

      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
}
