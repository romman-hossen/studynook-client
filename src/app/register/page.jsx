import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "StudyNook – Register",
  description: "Create an account on StudyNook to reserve library study rooms and list your spaces.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-16rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
