## Key Points

- Research indicates that shadcn/ui introduced several new components in October 2025, including Spinner, Kbd, Button Group, Input Group, Field, Item, and Empty, to enhance form handling, loading states, and user interactions.
- These components are designed for easy customization using Tailwind CSS and integration with libraries like Radix UI, making them suitable for building accessible, responsive UIs.
- Evidence suggests they address common development needs, such as loading indicators and grouped form elements, with built-in support for dark mode and ARIA compliance.
- It appears likely that these additions promote code ownership by allowing developers to copy and paste components directly into projects without vendor lock-in.

## Overview of Usage

These new components can be added via the shadcn CLI (e.g., `npx shadcn@latest add spinner`) and are compatible with React-based frameworks like Next.js. They emphasize composition, allowing you to build complex UIs by combining them with existing elements. For instance, Spinner can be embedded in buttons for loading states, while Field simplifies form validation across libraries like React Hook Form.

## Simple Examples

Start by importing the component from your UI directory. Here's a basic usage for each:

- **Spinner**: Use for loading indicators.

  ```tsx:disable-run
  import { Spinner } from "@/components/ui/spinner";
  function LoadingButton() {
    return <Button disabled><Spinner /> Loading...</Button>;
  }
  ```

- **Kbd**: Display keyboard shortcuts.

  ```tsx
  import { Kbd } from "@/components/ui/kbd";
  <Tooltip content="Bold">
    <Kbd>Ctrl + B</Kbd>
  </Tooltip>;
  ```

- **Button Group**: Group related actions.

  ```tsx
  import { ButtonGroup, Button } from "@/components/ui/button-group";
  <ButtonGroup>
    <Button>Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>;
  ```

- **Input Group**: Add prefixes or icons to inputs.

  ```tsx
  import {
    InputGroup,
    InputGroupAddon,
    Input,
  } from "@/components/ui/input-group";
  <InputGroup>
    <InputGroupAddon>$</InputGroupAddon>
    <Input placeholder="Amount" />
  </InputGroup>;
  ```

- **Field**: Build labeled form fields.

  ```tsx
  import { Field, FieldLabel, Input } from "@/components/ui/field";
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" />
  </Field>;
  ```

- **Item**: Create list or card items.

  ```tsx
  import { Item, ItemTitle, ItemDescription } from "@/components/ui/item";
  <Item>
    <ItemTitle>Task</ItemTitle>
    <ItemDescription>Complete by Friday.</ItemDescription>
  </Item>;
  ```

- **Empty**: Handle empty states.
  ```tsx
  import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
  <Empty>
    <EmptyTitle>No Results</EmptyTitle>
    <EmptyDescription>Try a different search.</EmptyDescription>
  </Empty>;
  ```

For more details, refer to the official documentation at [ui.shadcn.com](https://ui.shadcn.com).

---

### Comprehensive Guide to shadcn/ui's New 2025 Components: Usage and Examples

shadcn/ui has established itself as a foundational library for modern web design systems, offering customizable components built on Tailwind CSS and accessible primitives like those from Radix UI. In October 2025, the library expanded with seven new components—Spinner, Kbd, Button Group, Input Group, Field, Item, and Empty—aimed at streamlining common UI patterns such as loading states, form compositions, and empty content handling. These additions build on the library's philosophy of code ownership, where developers install components via CLI and modify them directly in their projects, avoiding external dependencies and enabling seamless integration with frameworks like Next.js, Remix, or Vite.

This guide provides an in-depth exploration of each component, including descriptions, key features, integration tips, and practical code examples. Drawn from official changelogs and documentation, it emphasizes real-world applications, such as enhancing forms with validation or displaying keyboard shortcuts in tutorials. All components support dark mode, ARIA attributes for accessibility, and customization through CSS variables or Tailwind classes. They are framework-agnostic, working with any React-compatible setup, and can be composed with third-party libraries like React Hook Form or TanStack Form for advanced functionality.

#### Background on the 2025 Updates

The October 2025 release focused on "polishing" abstractions rather than primitives, addressing developer feedback for higher-level tools that reduce boilerplate in everyday tasks. For instance, Field abstracts complex form fields, while Empty provides a standardized way to handle no-data scenarios. These components were introduced without breaking changes, ensuring compatibility with existing projects. The CLI (version 3.0 from August 2025) facilitates easy addition: run `npx shadcn@latest add [component]` to scaffold files in your `/components/ui` directory. Configuration in `components.json` (e.g., aliases like `"ui": "@/components/ui"`) ensures smooth imports.

Community discussions highlight these as essential for professional UIs, with integrations in tools like Figma kits and AI-generated code via MCP servers. While no major controversies exist, some developers note a preference for headless alternatives for ultimate control, though shadcn/ui's copy-paste model mitigates this by allowing full ownership.

#### Detailed Usage and Examples for Each Component

Below is a breakdown of each new component, including sub-components, props, and example scenarios. Code snippets are in TypeScript (TSX) for React, assuming a standard shadcn/ui setup.

##### Spinner

- **Description**: A simple loading indicator that can be embedded in buttons, inputs, or full-page loaders. It supports size variations and can be replaced with custom animations.
- **Key Features**: Customizable speed and size; integrates with other components for contextual loading (e.g., async operations).
- **Integration Tips**: Use with state management like `isLoading` hooks. Compatible with libraries like Sonner for toasts.
- **Example**: In a form submission button.

  ```tsx
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { Spinner } from "@/components/ui/spinner";

  function SubmitButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    return (
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <Spinner className="mr-2" /> : null}
        Submit
      </Button>
    );
  }
  ```

  This example shows Spinner providing visual feedback during an async operation, improving user experience.

##### Kbd

- **Description**: Renders keyboard keys or groups, ideal for displaying shortcuts in menus, tooltips, or documentation.
- **Key Features**: Supports individual keys or grouped combinations (e.g., Ctrl + Shift + K); customizable styling for keys like rounded corners.
- **Integration Tips**: Pair with Tooltip or Command components for interactive shortcuts. Use KbdGroup for multi-key displays.
- **Example**: In a command palette tutorial.

  ```tsx
  import { Kbd, KbdGroup } from "@/components/ui/kbd";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

  function ShortcutDisplay() {
    return (
      <Tooltip>
        <TooltipTrigger>Hover for shortcut</TooltipTrigger>
        <TooltipContent>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          to open search
        </TooltipContent>
      </Tooltip>
    );
  }
  ```

  Here, Kbd enhances accessibility by visually representing keyboard inputs.

##### Button Group

- **Description**: Groups buttons for cohesive actions, supporting separators, text, and nested groups. Useful for toolbars or input addons.
- **Key Features**: Horizontal/vertical orientation; split buttons with ButtonGroupSeparator; integration with inputs for prefixed actions.
- **Integration Tips**: Use for filters or pagination. Nested groups allow complex layouts like dropdowns.
- **Example**: A toolbar with split actions.

  ```tsx
  import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
    Button,
  } from "@/components/ui/button-group";

  function Toolbar() {
    return (
      <ButtonGroup>
        <Button>Edit</Button>
        <ButtonGroupSeparator />
        <Button>Delete</Button>
        <ButtonGroupText> | </ButtonGroupText>
        <Button>Share</Button>
      </ButtonGroup>
    );
  }
  ```

  This creates a segmented control, common in editors or dashboards.

##### Input Group

- **Description**: Enhances inputs with addons like icons, buttons, or text. Supports textareas for multi-line fields.
- **Key Features**: Prefix/suffix positioning; validation states; character counters.
- **Integration Tips**: Combine with Spinner for loading in search fields. Works with currency or URL prefixes.
- **Example**: A search input with icon and button.

  ```tsx
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Button,
  } from "@/components/ui/input-group";
  import { SearchIcon } from "lucide-react"; // Assuming icon library

  function SearchBar() {
    return (
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search products..." />
        <Button>Go</Button>
      </InputGroup>
    );
  }
  ```

  Ideal for forms requiring contextual addons, like e-commerce search.

##### Field

- **Description**: A versatile form field composer supporting various controls, labels, errors, and groupings. Responsive layouts adapt to screen sizes.
- **Key Features**: Works with inputs, selects, checkboxes; FieldGroup/FieldSet for sections; orientation props (vertical, horizontal, responsive).
- **Integration Tips**: Integrate with form libraries for validation. Use FieldLegend for grouped legends.
- **Example**: A responsive form section.

  ```tsx
  import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldGroup,
    FieldSet,
    FieldLegend,
    Input,
  } from "@/components/ui/field";
  import { useForm } from "react-hook-form"; // Example with React Hook Form

  function UserForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FieldSet>
          <FieldLegend>Personal Info</FieldLegend>
          <FieldGroup orientation="responsive">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" {...register("name", { required: true })} />
              {errors.name && <FieldError>Required</FieldError>}
              <FieldDescription>Enter your full name.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <FieldError>Required</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit">Save</Button>
      </form>
    );
  }
  ```

  This demonstrates complex form building with validation and responsiveness.

##### Item

- **Description**: Flexible container for list or card content, with media support (icons, avatars, images).
- **Key Features**: asChild prop for links; ItemGroup for collections.
- **Integration Tips**: Use in lists or galleries. Compose with avatars for user profiles.
- **Example**: A navigable list item.

  ```tsx
  import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    ItemGroup,
  } from "@/components/ui/item";
  import { HomeIcon } from "lucide-react";
  import Link from "next/link";

  function NavList() {
    return (
      <ItemGroup>
        <Item asChild>
          <Link href="/dashboard">
            <ItemMedia variant="icon">
              <HomeIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Dashboard</ItemTitle>
              <ItemDescription>View metrics and reports.</ItemDescription>
            </ItemContent>
          </Link>
        </Item>
      </ItemGroup>
    );
  }
  ```

  Perfect for sidebars or search results.

##### Empty

- **Description**: Manages empty states with media, titles, descriptions, and actions.
- **Key Features**: Custom media variants; EmptyContent for CTAs.
- **Integration Tips**: Use in lists or searches when data is absent. Integrate with conditional rendering.
- **Example**: An empty inbox state.

  ```tsx
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyMedia,
    EmptyTitle,
  } from "@/components/ui/empty";
  import { InboxIcon } from "lucide-react";
  import { Button } from "@/components/ui/button";

  function Inbox({ messages }) {
    if (messages.length === 0) {
      return (
        <Empty>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No Messages</EmptyTitle>
          <EmptyDescription>
            You haven't received any messages yet.
          </EmptyDescription>
          <EmptyContent>
            <Button>Compose New</Button>
          </EmptyContent>
        </Empty>
      );
    }
    // Render messages...
  }
  ```

  Enhances UX by guiding users in empty scenarios.

#### Comparison Table of New Components

To aid selection, here's a table summarizing features, use cases, and dependencies:

| Component    | Sub-Components                                                              | Primary Use Case         | Key Props/Features               | Dependencies/Integrations              | Example Complexity |
| ------------ | --------------------------------------------------------------------------- | ------------------------ | -------------------------------- | -------------------------------------- | ------------------ |
| Spinner      | N/A                                                                         | Loading indicators       | Size, speed; embeddable          | None; works with Button/Input          | Low                |
| Kbd          | KbdGroup                                                                    | Keyboard shortcuts       | Grouping; icons                  | Tooltip/Command                        | Low                |
| Button Group | ButtonGroupSeparator, ButtonGroupText                                       | Grouped actions/toolbars | Orientation; nesting             | Input for addons                       | Medium             |
| Input Group  | InputGroupAddon, InputGroupInput                                            | Enhanced inputs          | Prefix/suffix; validation        | Icons; Spinner                         | Medium             |
| Field        | FieldDescription, FieldError, FieldLabel, FieldGroup, FieldSet, FieldLegend | Form fields/sections     | Responsive orientation; controls | Form libraries (e.g., React Hook Form) | High               |
| Item         | ItemContent, ItemDescription, ItemMedia, ItemTitle                          | Lists/cards              | asChild; media variants          | Links/Avatars                          | Medium             |
| Empty        | EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle                      | Empty states             | CTAs; media                      | Conditional rendering                  | Low                |

This table highlights how components scale from simple (e.g., Spinner) to complex (e.g., Field), promoting modular design.

#### Best Practices and Considerations

- **Customization**: Edit Tailwind classes in component files for themes. Use CSS variables for global overrides.
- **Accessibility**: All include ARIA roles; test with screen readers.
- **Performance**: Lightweight; avoid over-nesting for render efficiency.
- **Ecosystem**: Compatible with 2025 updates like Tailwind v4 and React 19. Community extensions (e.g., awesome-shadcn-ui) offer variants.
- **Potential Drawbacks**: Relies on Tailwind; may require adjustments for non-React frameworks.

In summary, these 2025 additions empower developers to create more intuitive UIs with less code, aligning with shadcn/ui's evolution toward practical, customizable tools.

#### Key Citations

- [The Foundation for your Design System - shadcn/ui](https://ui.shadcn.com/)
- [Field - shadcn/ui](https://ui.shadcn.com/docs/components/field)
- [Changelog - shadcn/ui](https://ui.shadcn.com/docs/changelog)
- [Input - Shadcn UI](https://ui.shadcn.com/docs/components/input)
- [Button - Shadcn UI](https://ui.shadcn.com/docs/components/button)
- [Tooltip - Shadcn UI](https://ui.shadcn.com/docs/components/tooltip)

```

```
