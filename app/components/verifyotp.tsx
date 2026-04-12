"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

const Verifyotp = () => {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const URL = "http://localhost:8080"

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (otp.length !== 6) {
      setErrorMessage("OTP must be 6 digits.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.message || result.error || "OTP verification failed")
        return
      }

      setSuccessMessage(result.message || "OTP verified successfully.")
      router.push("/login")
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("Unable to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setErrorMessage("")
    setSuccessMessage("")

    setLoading(true)

    try {
      const response = await fetch(`${URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.message || result.error || "Unable to resend OTP")
        return
      }

      setSuccessMessage(result.message || "OTP resent successfully.")
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("Unable to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleVerify}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-bold">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code to verify your account.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="otp-field" className="text-center">
            OTP
          </FieldLabel>
          <div className="flex justify-center">
            <InputOTP
              id="otp-field"
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="justify-center"
            >
              <InputOTPGroup className="gap-1.5">
                <InputOTPSlot index={0} className="h-10 w-10 text-base font-medium" />
                <InputOTPSlot index={1} className="h-10 w-10 text-base font-medium" />
                <InputOTPSlot index={2} className="h-10 w-10 text-base font-medium" />
              </InputOTPGroup>
              <InputOTPSeparator className="px-1" />
              <InputOTPGroup className="gap-1.5">
                <InputOTPSlot index={3} className="h-10 w-10 text-base font-medium" />
                <InputOTPSlot index={4} className="h-10 w-10 text-base font-medium" />
                <InputOTPSlot index={5} className="h-10 w-10 text-base font-medium" />
              </InputOTPGroup>
            </InputOTP>
          </div>
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

        <Field orientation="horizontal" className="gap-2">
          <Button
            type="submit"
            className="w-full h-10 bg-black text-white"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </Field>

        <Field orientation="horizontal" className="gap-2">
          <Button
            type="button"
            className="w-full h-10 bg-gray-200 text-black"
            onClick={handleResend}
            disabled={loading}
          >
            Resend OTP
          </Button>
        </Field>

        <p className="text-xs text-center text-muted-foreground">
          Didn’t receive it? Go back to <Link href="/sign_up" className="underline">signup</Link> and try again.
        </p>
      </FieldGroup>
    </form>
  )
}

export default Verifyotp
