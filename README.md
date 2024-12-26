# Form Builder

A modern, powerful drag-and-drop form builder application that empowers users to create sophisticated forms with ease. Built with Next.js and TypeScript, this tool combines intuitive design with robust functionality.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://formbuilder-1qdk.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/Sujanbomjan/formbuilder)


## Features

*   **Drag-and-Drop Interface:** Easily build forms by dragging and dropping elements from a sidebar onto the canvas.
*   **Multiple Form Element Types:** Supports a variety of input types, including text inputs, checkboxes, date pickers, select dropdowns, file uploads, OTP inputs, passwords, and phone number inputs.
*   **Two Layout Modes:** Supports "default" and "custom" layout modes with distinct styling.
*   **Live Form Preview:**  View a real-time preview of your form as you build it.
*   **JSON Output:** Generates a JSON representation of the form data upon submission.
*   **Customizable Form Element Labels:** Each form element can be given a specific label.
*   **Data Validation:** Uses `zod` for schema definition and form validation.

## Technologies

*   **Next.js:** React framework for building user interfaces
*   **React Hook Form:** For handling form state and validation.
*   **React DND:** For drag-and-drop functionality.
*   **Radix UI:** For accessible UI components.
*   **Tailwind CSS:** For styling.
*   **Jotai:** For state management.
*   **Zod:**  For schema validation.
*   **Lucide React:** For icons.

## Getting Started

Follow these instructions to get the project running locally:

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or higher)
*   [npm](https://www.npmjs.com/) (or yarn, pnpm, bun)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Sujanbomjan/formbuilder
    cd formbuilder
    ```
2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

*   `app/`: Contains the main application code, including pages and layouts.
*   `src/features/`: Contains the main features such as the form builder, the drag and drop area, sidebar, and form preview.
*   `src/types/`: Includes type definitions for form components.
*   `components/`: Includes reusable UI components.
*   `components.json`: Configuration file for `shadcn/ui` components.
*   `next.config.ts`: Configuration file for Next.js.
*   `package.json`: Project dependencies and scripts.
*   `tailwind.config.ts`: Configuration file for Tailwind CSS.
*   `vercel.json`: Configuration file for Vercel deployment.

##  Form Elements

The form builder currently supports these elements:

*   Checkbox
*   Input (text)
*   Date
*   File
*   Select (dropdown)
*   Datetime
*   Date Picker
*   Input OTP
*   Password
*    Phone

## Usage

1.  Select a layout mode (default or custom).
2.  Drag and drop elements from the sidebar onto the drag-and-drop area.
3.  Customize form element labels as needed.
4.  View the form preview.
5.  Submit the form to generate JSON output.

