"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const ForgotPass = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const URL = "http://localhost:8080"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    setLoading(true)

    try {
      const res = await fetch(`${URL}/api/auth/forgotpass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (!res.ok) {
        setErrorMessage(result.message || result.error || "Unable to process request")
        return
      }

      setSuccessMessage(result.message || "Password reset request submitted.")
    } catch (err) {
      console.error("Error:", err)
      setErrorMessage("Unable to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email to continue. <br />
            Remember your password?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
          <Input
            id="forgot-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-84 h-10 bg-black text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Reset Request"}
          </Button>
        </Field>

        <hr className="border-gray-400" />

        <Field orientation="horizontal">
          <Link href="/login">
            <Button className="w-84 h-10 bg-gray-200 text-black">
              Back to Login
            </Button>
          </Link>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ForgotPass
