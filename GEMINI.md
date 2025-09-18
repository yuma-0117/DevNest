# Project Overview

This is a Next.js project that appears to be a forum or discussion board application called "DevNest". It uses NextAuth.js for authentication with a GitHub provider, Prisma as the ORM, and a PostgreSQL database. The application allows users to create threads, write posts, and tag them.

## Key Technologies

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Project Structure

*   `src/app`: Contains the main application code, including pages, layouts, and components.
*   `src/lib`: Contains the authentication logic and database client.
*   `prisma`: Contains the database schema and migrations.
*   `public`: Contains static assets like images.

# Building and Running

To build and run this project, you will need to have Node.js and npm installed.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following environment variables:

    ```
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
    DIRECT_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
    AUTH_GITHUB_ID="<your-github-client-id>"
    AUTH_GITHUB_SECRET="<your-github-client-secret>"
    ```

3.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Development Conventions

*   **Linting:** The project uses ESLint for code linting. You can run the linter with the following command:

    ```bash
    npm run lint
    ```

*   **Code Style:** The project uses Prettier for code formatting. It is recommended to set up your editor to format on save.
*   **Testing:** There are no tests in the project yet. It is recommended to add tests for new features.
