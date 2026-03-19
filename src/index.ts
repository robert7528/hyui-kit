// ── Components ──────────────────────────────────────────────────────────────
export { Badge, badgeVariants } from './components/badge'
export { type BadgeProps } from './components/badge'
export {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from './components/breadcrumb'
export { Button, buttonVariants } from './components/button'
export type { ButtonProps } from './components/button'
export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
} from './components/card'
export { Checkbox } from './components/checkbox'
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/collapsible'
export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from './components/dialog'
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup,
  DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuRadioGroup,
} from './components/dropdown-menu'
export { Input } from './components/input'
export type { InputProps } from './components/input'
export { Label } from './components/label'
export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
} from './components/select'
export {
  Popover, PopoverTrigger, PopoverContent,
} from './components/popover'
export { Separator } from './components/separator'
export {
  Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
} from './components/sheet'
export { Skeleton } from './components/skeleton'
export { Switch } from './components/switch'
export {
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,
} from './components/table'
export { Textarea } from './components/textarea'
export type { TextareaProps } from './components/textarea'
export {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from './components/tooltip'

export { Toaster, toast } from './components/sonner'

// ── Wujie-compatible alternatives ────────────────────────────────────────────
// Use these in wujie sub-apps instead of Radix Dialog/Tooltip/Popover.
export { CssTooltip, InlinePopover, ConfirmModal } from './components/wujie-compat'
export type { CssTooltipProps, InlinePopoverProps, ConfirmModalProps } from './components/wujie-compat'

// ── Lib ─────────────────────────────────────────────────────────────────────
export { cn } from './lib/utils'
export { PLATFORM_STORAGE_KEYS } from './lib/constants'
export { createApiFetch } from './lib/create-fetch'
export type { ApiFetchConfig, ApiResponse } from './lib/create-fetch'

// ── Hooks ───────────────────────────────────────────────────────────────────
export { LocaleProvider, useLocale } from './hooks/use-locale'

// ── i18n ────────────────────────────────────────────────────────────────────
export { localeLabels, mergeMessages } from './i18n'
export type { Locale } from './i18n'
