import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "StudyNook – Login",
  description: "Sign in to your StudyNook account to manage your library room bookings and listings.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
