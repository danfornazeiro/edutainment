"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(8, "Senha inválida."),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não encontrado.");
            form.setError("email", { message: "E-mail não encontrado." });
          }
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválido");
            form.setError("email", { message: "E-mail ou senha inválidos." });
          }
          toast.error(ctx.error.message);
        },
      },
    });
  };

  const handleLoginWithGoogle = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-5">
      <Card className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <CardHeader className="bg-white p-6 sm:p-8">
          <CardTitle className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Entrar
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500 sm:text-base">
            Faça login para continuar.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6 sm:space-y-8 sm:p-8"
          >
            <CardContent className="grid gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu email"
                        {...field}
                        className="w-full rounded-lg border-gray-300 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                        className="w-full rounded-lg border-gray-300 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-3 sm:gap-4">
              <Button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 sm:py-4"
              >
                Entrar
              </Button>
              <Button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 transition hover:bg-gray-100 sm:py-4"
                onClick={handleLoginWithGoogle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-17.7-1.4-35.5-4.4-52.7H272v99.7h146.9c-6.4 34.9-25.8 64.4-55.2 84.1v69h89.2c52.3-48.2 80.6-119.2 80.6-200.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M272 544.3c73.5 0 135.2-24.3 180.2-66.1l-89.2-69c-24.8 16.7-56.5 26.6-91 26.6-69.9 0-129.2-47.2-150.4-110.6h-91.7v69.9c45.1 89.1 137.5 149.2 242.1 149.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M121.6 325.2c-10.2-30.3-10.2-63.5 0-93.8v-69.9h-91.7c-39.7 77.9-39.7 168.1 0 246z"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 107.7c37.6-.6 73.7 13.3 101.3 38.6l75.5-75.5C408.3 24.9 343.1-.2 272 0 167.4 0 75.1 60.1 30 149.2l91.6 69.9c21.2-63.4 80.5-110.6 150.4-110.6z"
                  />
                </svg>
                Login com Google
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignInForm;
