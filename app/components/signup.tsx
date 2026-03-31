"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

const Inputfieldsignup = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const URL = "http://localhost:8080";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res = await fetch(`${URL}/api/auth/check-exist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("User check failed");
        console.log(result.message || result.error);
        return;
      }

      res = await fetch(`${URL}/api/auth/SignUP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const signupResult = await res.json();

      if (!res.ok) {
        console.log("Signup failed");
        console.log(signupResult.message || signupResult.error);
        return;
      }

      console.log("Signup successful");

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to create an account. <br />
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* EMAIL */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </Field>

        {/* PASSWORD */}
        <Field>
          <FieldLabel htmlFor="password">
            Password
            <Link href="/forgot_password" className="ml-auto hover:underline">
              Forgot your password?
            </Link>
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="No One is Watching"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </Field>

        {/* TERMS */}
        <FieldGroup className="mr-auto w-56">
          <Field orientation="horizontal">
            <Checkbox id="terms-checkbox-basic" />
            <FieldLabel htmlFor="terms-checkbox-basic">
              Accept terms and conditions
            </FieldLabel>
          </Field>
        </FieldGroup>

        {/* SUBMIT */}
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-84 h-10 bg-black text-white"
          >
            Continue
          </Button>
        </Field>

        <hr className="border-gray-400" />

        <Field orientation="horizontal">
          <Link href="/login">
            <Button className="w-84 h-10 bg-gray-200 text-black">
              Login Instead?
            </Button>
          </Link>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default Inputfieldsignup