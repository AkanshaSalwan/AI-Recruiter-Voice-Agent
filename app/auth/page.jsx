'use client';
import { Button } from '@/components/ui/button';
import { createClient } from '@/services/supabaseClient.js';
import Image from 'next/image';

function Login() {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen`}>
      <div className={`flex flex-col items-center border rounded-2xl p-8`}>
        <Image
          src={`/AI Interview Voice Agent Logo.png`}
          alt={`logo`}
          width={150}
          height={150}
          className={`w-[180px]`}
        />
        <div className={`flex flex-col items-center`}  >
          <Image
            src={`/login.png`}
            alt={`login`}
            width={600}
            height={400}
            className={`w-[400px] h-[250px]  rounded-2xl`}
          />
          <h2 className={`text-2xl font-bold text-center mt-5`}>Welcome to the AI Recruiter</h2>
          <p className={`text-gray-500 text-center`}>Sign In With Google Authentication</p>
           <Button className={`mt-7 w-full`} onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;