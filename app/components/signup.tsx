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
import { useRouter } from "next/navigation"
import { useState } from "react"

const Inputfieldsignup = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const URL = "http://localhost:8080"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
  
    if (!acceptedTerms) {
      setErrorMessage("Please accept the terms and conditions to continue.")
      return
    }
  
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Password and confirm password do not match.")
      return
    }
  
    try {
      let res = await fetch(`${URL}/api/auth/check-exist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email, // ✅ removed password from here
        }),
      })
  
      const result = await res.json()
  
      if (!res.ok) {
        setErrorMessage(result.message || result.error || "User check failed")
        return
      }
  
      res = await fetch(`${URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })
  
      const signupResult = await res.json()
  
      if (!res.ok) {
        setErrorMessage(signupResult.message || signupResult.error || "Signup failed")
        return
      }
  
      router.push("/verify_otp")
  
      console.log("Signup successful")
    } catch (err) {
      console.error("Error:", err)
      setErrorMessage("Unable to connect to server.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col gap-1 ">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to create an account. <br />
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="No One is Watching"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />
        </Field>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <FieldGroup className="mr-auto w-56">
          <Field orientation="horizontal">
            <Checkbox
              id="terms-checkbox-basic"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
            />
            <FieldLabel htmlFor="terms-checkbox-basic">
              Accept terms and conditions
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-84 h-10 bg-black text-white"
            disabled={!acceptedTerms}
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
