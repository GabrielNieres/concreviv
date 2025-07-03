## Project Overview

The "CONCREVIV V1" project focuses on creating a web application that allows clients to customize home designs and explore various architectural options, prioritizing usability and an engaging user interface. The application will also provide users with tools for project financing, permit management, and professional design consulting.

## Technology Stack and Architecture
- **Architecture:** Framework versions must be compatible with each other and stable in their implementation.
- **Frontend:** Next.js was selected for its server-side rendering capabilities and SEO benefits. Tailwind CSS will be used for styling, ensuring a responsive and modern design. Shadcn/ui components will help maintain design consistency throughout the application.
- **Backend:** Node.js with Express.js provides a robust backend framework that facilitates RESTful API development. This ensures efficient management of customization requests, model selection, and more.
- **Database:** Supabase was selected for its real-time database capabilities and easy integration with the frontend. It will efficiently manage user data, customization options, and model details. Implement user creation management, with permission settings for the database. Users can remain logged in as both a guest and admin user.
- **Implementation:** Vercel will be used for implementation, leveraging its seamless integration with Next.js for automatic scaling and optimized performance.
- **Third-Party Services:** Build the right framework to deploy in Vercel and seamlessly upload it to GitHub.

## UI and Style Guide

- **Design Considerations:** "Make it look like it was created by an award-winning designer. Ultra-modern, fun, highly usable, with fluid micro-interactions and engaging UX details that enhance the user experience."
- **Accessibility and Responsive Design:** Ensure the app is fully responsive on all devices with Tailwind and prioritize contrast ratios and font sizes to meet accessibility standards.
- **Routing Strategy:** Use the Next.js application router (src/app/ directory) for page routing. Each critical feature or screen mentioned in the user experience should be implemented as a separate page or route. Maintain logical and consistent routing without nesting issues. **Styling Strategy:** Use a Tailwind CSS configuration:
- Create a `tailwind.config.js` file with the appropriate content paths and theme extensions.
- Update `package.json` with the dependencies: Tailwind CSS, PostCSS.
- In `src/app/globals.css`, use Tailwind directives and define base styles.

## Directory and File Structure

- All code resides in the `src/` directory to maintain a clear separation of duties.
- Maintain logical and concise paths, ensuring that each main function or screen described in the user journey is a separate page. For example:
- `src/app/page.tsx` for the landing/home functionality.
- `src/app/design-customization/page.tsx` for design customization features.
- `src/app/pre-established-models/page.tsx` for selecting models that already have defined layouts and dimensions.
- `src/app/turnkey-delivery/page.tsx` for the complete configuration of the home with the different possibilities for services or additional features, such as a pool, for example.
- `src/app/financing-assistance/page.tsx` for comparing the different types of financing available, such as mortgages.
- `src/app/ability-assistance/page.tsx` assistance for approval of plans, projects, and municipal permits.
- `src/app/compare/page.tsx` section showing the differences between the traditional system and block-based construction.
- etc.

## Development Setup

- Use Next.js with App Router for page management.
- Configure Tailwind CSS for styling and ensure it is reflected across all app components to ensure consistency and responsiveness.

---

#