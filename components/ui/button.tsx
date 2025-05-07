import React, { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

type ButtonProps = {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon" // Added
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = "default",
  size = "default", // Added
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition"

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    outline: "border border-green-600 text-green-600 hover:bg-green-100 focus:ring-green-500",
    ghost: "text-green-600 hover:bg-green-100",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-8 w-8 p-0",
  }

  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
