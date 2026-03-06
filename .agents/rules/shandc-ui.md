# shadcn/ui Best Practices & Usage Rules

This document outlines the rules for using `shadcn/ui` (referred to as `shandc-ui` in the project documentation) based on the official registry and project practices.

## 1. The Golden Rule: Never Edit `components/ui`

> [!IMPORTANT]
> **Files in `components/ui` are managed by the CLI/registry. NEVER edit them directly.**

- **Why**: Editing these files makes it impossible to update components without losing your changes.
- **How to customize**:
  - **Composition**: Wrap the UI component in a custom component and apply styles or logic there.
  - **Props**: Most components use `utils/cn` to merge class names. Pass extra classes via the `className` prop.
  - **Theming**: Adjust the global CSS variables in `app/globals.css` to change colors, border radius, and fonts project-wide.

## 2. UI-First Approach

> [!TIP]
> **Always prioritize using existing components from `components/ui` when building any new page or component.**

- **Consistency**: Use established UI components to maintain visual and functional consistency across the application.
- **Custom Components**: Even when building complex or custom business components, leverage the primitives in `components/ui` (e.g., `Button`, `Input`, `Card`, `Tooltip`) as building blocks. Avoid re-implementing styles or behaviors already provided by the UI layer.
- **Maximal Reuse**: If a needed pattern is similar to an existing UI component, prefer wrapping or extending that component over creating a new one from scratch.

## 3. Form Patterns

Forms should follow the Next.js 15+ idiomatic pattern using `useActionState`, Server Actions, and Zod for validation.

### Recommended Structure

Use the `<Field />` and `<FieldGroup />` components for accessible and flexible layouts.

```tsx
<Form action={formAction}>
  <FieldGroup>
    <Field data-invalid={!!formState.errors?.email?.length}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={formState.values.email}
        disabled={pending}
        aria-invalid={!!formState.errors?.email?.length}
      />
      <FieldDescription>We will never share your email.</FieldDescription>
      {formState.errors?.email && (
        <FieldError>{formState.errors.email[0]}</FieldError>
      )}
    </Field>
  </FieldGroup>
  <Button type="submit" disabled={pending}>
    {pending && <Spinner />} Submit
  </Button>
</Form>
```

### Key Principles:

- **Validation**: Use Zod schemas in a shared `schema.ts`.
- **Server Actions**: Handle submissions, validation errors, and business logic in `actions.ts`.
- **Progressive Enhancement**: Use the Next.js `<Form />` component.
- **States**: Manually handle `pending` state from `useActionState` to disable inputs and show UI indicators.

## 3. Dark Mode & Theming

- **ThemeProvider**: Ensure all components are wrapped in the `ThemeProvider` (already configured in `app/layout.tsx`).
- **ModeToggle**: Use the `ModeToggle` component for theme switching.
- **Styling**: Always use Tailwind's `dark:` modifier for theme-specific styles.
- **Hydration**: Use `suppressHydrationWarning` on the `<html>` tag as per Next.js theme patterns.

## 4. Component Usage Tips

- **Next.js Integration**: Always prefer components that are optimized for the App Router (using Server Components for layout and Client Components for interactivity).
- **Icons**: Use `lucide-react` for consistent iconography.
- **Accessibility**: Most components are built on top of Radix UI primitives. Ensure you maintain ARIA attributes (e.g., `aria-invalid`) when building custom wrappers.
- **Modals/Drawers**: Use `Dialog` or `Drawer` depending on the device/context, keeping in mind that `vaul` (Drawer) is often better for mobile.
