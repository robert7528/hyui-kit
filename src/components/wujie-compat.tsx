"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { cn } from "../lib/utils"

// ── CssTooltip ──────────────────────────────────────────────────────────────
// Pure CSS hover tooltip. Uses relative/absolute positioning (no Portal).
// Works in wujie sub-apps where Radix Tooltip positioning is broken.

interface CssTooltipProps {
  text: string
  side?: "top" | "bottom"
  children: React.ReactNode
}

function CssTooltip({ text, side = "bottom", children }: CssTooltipProps) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={cn(
          "absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded border bg-popover text-popover-foreground text-xs shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50",
          side === "bottom" ? "top-full mt-1" : "bottom-full mb-1"
        )}
      >
        {text}
      </span>
    </span>
  )
}

// ── InlinePopover ───────────────────────────────────────────────────────────
// State-toggle popover. Uses relative/absolute positioning (no Portal).
// Works in wujie sub-apps where Radix Popover positioning is broken.

interface InlinePopoverProps {
  trigger: React.ReactNode
  align?: "left" | "right"
  className?: string
  children: React.ReactNode
}

function InlinePopover({ trigger, align = "left", className, children }: InlinePopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [open])

  return (
    <span ref={ref} className="relative inline-flex">
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open && (
        <div
          className={cn(
            "absolute top-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md p-3 z-50 w-56",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </div>
      )}
    </span>
  )
}

// ── ConfirmModal ────────────────────────────────────────────────────────────
// Pure React modal dialog. Uses fixed overlay + stopPropagation (no Portal).
// Works in wujie sub-apps where Radix Dialog event handling is broken.

interface ConfirmModalProps {
  open: boolean
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  children?: React.ReactNode
}

function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  const handleCancel = useCallback(() => onCancel(), [onCancel])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, handleCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        className="bg-background rounded-lg border shadow-lg p-6 w-full max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCancel}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </button>
        <div className="space-y-1.5 pr-8">
          <h3 className="text-lg font-semibold">{title}</h3>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
        {children && <div className="mt-4">{children}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export { CssTooltip, InlinePopover, ConfirmModal }
export type { CssTooltipProps, InlinePopoverProps, ConfirmModalProps }
