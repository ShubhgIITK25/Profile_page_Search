import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Router } from "lucide-react"
import Link from "next/link"

function Inputfield() {
  return (
    <FieldGroup>
    <div className="flex flex-col gap-2 ">
  <h1 className="text-3xl font-bold">Log in</h1>
  
  <p className="text-sm text-muted-foreground">
    Please login to continue. Don't have an account?{" "}<br></br>
    <Link href="/sign_up" className="text-primary font-medium hover:underline">
      Sign up?
    </Link>
  </p>
</div>    
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
       
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Password
        <Link href="/forgot_password" className="ml-auto hover:underline">Forgot your password?</Link></FieldLabel>
        <Input id="fieldgroup-name" placeholder="No One is Watching" />
      </Field>
      <Field orientation="horizontal">
        <Button type="submit" className="w-84 h-10 bg-black text-white">Login</Button>
      </Field>
      <hr className="border-gray-400" />
      <Field orientation="horizontal">
        <Link href="/sign_up">
        <Button type="submit" className="w-84 h-10 bg-gray-200 text-black">Create new Account</Button>
        </Link> 
      </Field>
    </FieldGroup>
  )
}

export default Inputfield