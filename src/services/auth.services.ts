import { apiRequest } from "./api";
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string().min(6, "Confirm your password"),
  phone: z.string().regex(/^01\d{9}$/, "Enter a valid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export const signIn = (payload: { email: string; password: string }) => apiRequest<{ user?: { name?: string }; token?: string }>("/auth/signin", { method: "POST", body: JSON.stringify(payload) });
export const signUp = (payload: z.infer<typeof signupSchema>) => apiRequest("/auth/signup", { method: "POST", body: JSON.stringify(payload) });
export const sendResetCode = (email: string) => apiRequest("/auth/forgotPasswords", { method: "POST", body: JSON.stringify({ email }) });
export const verifyResetCode = (resetCode: string) => apiRequest("/auth/verifyResetCode", { method: "POST", body: JSON.stringify({ resetCode }) });
export const resetPassword = (email: string, newPassword: string) => apiRequest("/auth/resetPassword", { method: "PUT", body: JSON.stringify({ email, newPassword }) });
export const updateLoggedUser = (payload: { name: string; email: string; phone: string }) => apiRequest("/users/updateMe/", { method: "PUT", body: JSON.stringify(payload) });
