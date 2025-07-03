## User Journey Flow

The app follows a specific sequence of steps that should correspond to individual pages/paths within the app. Each main screen or feature will have its own dedicated page file. The implementation steps are detailed below, leveraging all the details of the PRD.

### Phase 1: Feature Development (Local)

#### Step 1: Design Customization - Customer Customization Preferences

- **Goal:** Allow customers to customize home designs to reflect their personal tastes and functional needs.
- **Acceptance Criteria:**
- Customers can choose from several architectural styles.
- Customers can modify the layout, materials, and finishes.

**Implementation:**
- Implement `src/app/design-customization/page.tsx` to incorporate UI components that allow home designs to be selected and modified.

- The appearance should be modern and intuitive, allowing customers to easily interact with customization options.
- Offer menus for selecting styles and interactive sliders for modifying layout and materials. Ensure this screen meets the user experience (UX) guidelines detailed above, providing a responsive and accessible design.

#### Step 2: Design Customization - Collaboration with the Designer

**Objective:** Facilitate collaboration between clients and designers to refine designs.
**Acceptance Criteria:**
**Clients send their contact information and desired configuration details to the designers via leads, and these details are saved as leads for further contact.

**Implementation:**
- Create `src/app/designer-collaboration/page.tsx` integrating the components for the construction type, styles, square footage, and materials.
- Use modal windows or pop-up notifications once the client's data has been submitted with the relevant information.

#### Step 3: Pre-established Models - Quick Selection Process

- **Purpose:** Allow customers to quickly select from pre-designed models to streamline construction.
- **Acceptance Criteria:**
- Customers can filter models by size, style, and features.
- Customers can view detailed information and images for each model.

**Implementation:**
- Develop `src/app/pre-established-models/page.tsx` with filtering and display capabilities.
- Use card components to display model options with detailed information accessible through modal interactions or on hover.

#### Step 4: Building Type Comparison

- **Purpose:** Allow customers to compare different building types side-by-side.
- **Acceptance Criteria:**
- Customers can select the building type and compare it to our model.
- The comparison includes key features, dimensions, and pricing.

**Implementation:**
- Implement `src/app/compare/page.tsx` for type comparison.
- Design interactive tables or grids to clearly display comparison metrics.
- Ensure comparisons are easy to interpret with visual aids such as icons or color-coded highlights.
#### Step 5: Turnkey Delivery - Complete Package Offer

- **Objective:** To offer clients a fully finished, move-in-ready home.
- **Acceptance Criteria:**
- All installations are completed before delivery.
- Finishes meet predefined quality standards.

**Implementation:**
- Create `src/app/turnkey/page.tsx` with complete information about the turnkey options.
- Display package details, prioritizing quality and availability, using rich media such as images and descriptions of materials and goods.

### Step 6: Turnkey Delivery - Quality Control

- **Objective:** To ensure that all finishes and installations meet the highest quality standards.
- **Acceptance Criteria:**
- All finishes must pass quality controls before delivery.
- Clients receive quality standards documentation.

**Implementation:**
- Develop quality assurance functions in `src/app/quality-assurance/page.tsx`. - Provide sections for accessing documentation and quality verification processes.

#### Step 7: Fixed Pricing Structure - Transparent Pricing Summary

- **Objective:** Provide clients with a clear pricing structure.
- **Acceptance Criteria:**
- Clients can see a detailed price breakdown per square meter.
- The price includes all possible additional costs.

**Implementation:**
- Implement `src/app/pricing/page.tsx` with detailed pricing breakdowns.
- Use collapsible elements to display pricing details, ensuring clarity and transparency.
- Add a note stating that prices may vary and are updated as of a certain date. If you need more information, please contact us and we will provide an updated quote.

#### Step 8: Fixed Pricing Structure - Cost Calculation Tool

- **Objective:** Allow customers to estimate potential costs based on features.
- **Acceptance Criteria:**
- Customers can enter features to receive cost estimates.
- The tool provides a clear summary of estimated costs.

**Implementation:**
- Create a calculation tool within `src/app/cost-calculator/page.tsx`.
- Use dynamic forms and summaries to interactively update cost estimates as users make selections.

### Phase 2: Integrations and Authentication

- Integrate authentication for potential users to optimize customer engagement and data retention.
- Ensure user data, such as customization preferences, designer feedback, etc., is linked to user profiles to ensure a seamless and continuous experience after authentication.
The user can log in and out, and when logged in, the logged-in user's email address is displayed.

### Phase 3: Database Integration

- Use Supabase for data management, ensuring all customer input and selections are efficiently stored.
- Implement real-time database updates, especially for customizable features and designer feedback, ensuring the application reflects the latest state as users interact.
-The user will be able to create their user and save their information requests in a lead database, with the contact information and save the data they selected.


Each function must be implemented according to its full PRD definition, in order to meet the acceptance criteria and ensure a consistent user experience throughout the application. Avoid abbreviations or summaries of the PRD, ensuring that every detail of the implementation is fully represented. This structured approach, with dedicated pages/paths for each step of the user journey, will ensure a streamlined and efficient development process.
```