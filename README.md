# 📄 eStaff - Technical Test (ASO Flow)

*Read this in [Portuguese 🇧🇷](README.pt-br.md)*

This repository contains the resolution of the technical test for the Software Engineer position. The challenge consisted of implementing the complete flow of the **"Data and skills"** screen of an application for freelancers, focusing on the functionality of declaring and uploading the **ASO (Occupational Health Certificate)**.

## 📱 Project Demo (Videos)

Watch the application running natively on both platforms, demonstrating all the required business rules, animations, UI fidelity, and form validations:

- **🤖 Android Demo:** [Watch Video on Google Drive](https://drive.google.com/file/d/1GHp2cWSMXffhaHXgQ_FeNY0G0qH7YZyq/view?usp=drive_link)
- **🍎 iOS Demo:** [Watch Video on Google Drive](https://drive.google.com/file/d/1OnJedtkrwymnojSjvHcM-NUYOleQVNCM/view?usp=drive_link)

## 🎯 Objective and Focus

The main objective of this implementation was not just to deliver a functional screen, but to demonstrate mastery in software architecture, design patterns, scalability, and code quality in mobile applications.

The application was designed to be highly testable, with a clear Separation of Concerns, strict typing (TypeScript), and a pixel-perfect implementation of the provided Figma wireframes.

## 🏗️ Architecture and Technical Decisions

The architecture was modularized following **Clean Code** and **SOLID** principles:

- **Componentization (Dumb Components):** The entire Design System (Buttons, Inputs, Tooltips, Checkboxes, RadioGroups) was isolated in the `src/components/ui` directory. These components are "dumb", receive only `props` and don't know business rules, making reuse and testability easier.
- **State Management and Validation:** The **React Hook Form (RHF) + Zod** duo was chosen to ensure high performance (avoiding unnecessary re-renders on every keystroke) and robust, immutable schema validation inferred by TypeScript.
- **Logic Isolation (Custom Hooks):** All the screen's business logic (conditional display control, upload interactions, tooltip visibility, and submission) was extracted to the `useAsoForm` hook. The screen (`DataAndSkillsScreen`) acts purely declaratively, orchestrating the UI.
- **Service Layer (Mock API):** External communication was abstracted in `asoService`. If a real backend is connected in the future, refactoring will be restricted exclusively to this file, with no impact on the UI or Hook.
- **Error Handling & Resilience:** Implemented a Global Error Boundary to prevent abrupt crashes and a structured Logger service.
- **Strict Typing:** There is no use of `any`. All schemas generate automatic typings via `zod.infer`, creating a Single Source of Truth.

## 🛠️ Technology Stack

- **React Native / Expo:** Main framework for cross-platform development.
- **TypeScript:** Static typing to prevent compile-time errors.
- **React Hook Form:** Optimized form management.
- **Zod:** Schema declaration and validation.
- **Expo Document Picker:** For native access to device files (PDF Upload).
- **React Navigation:** Bottom Tabs and Native Stack for navigation.
- **Jest & React Native Testing Library:** For robust integration and unit testing.

## 📂 Directory Structure

```text
estaff-technical-test/
├── src/
│   ├── components/
│   │   ├── forms/            # Complex business-rule bound form sections
│   │   └── ui/               # Generic visual components (Design System)
│   ├── constants/
│   │   └── theme.ts          # Design tokens (Colors, Spacing, Borders)
│   ├── hooks/
│   │   └── useAsoForm.ts     # Business logic and form orchestration
│   ├── navigation/
│   │   └── AppNavigator.tsx  # Navigation routes setup
│   ├── screens/
│   │   ├── ProfileScreen.tsx # Profile view
│   │   ├── ProfessionalInfoScreen.tsx # Professional Info view
│   │   ├── DataAndSkillsScreen.tsx # View (Main screen)
│   │   └── SplashScreen.tsx  # Custom animated splash screen
│   ├── services/
│   │   ├── asoService.ts     # API communication layer (Mock)
│   │   └── loggerService.ts  # Centralized error logging facade
│   ├── types/
│   │   └── aso.ts            # Global typings derived from Zod
│   ├── utils/
│   │   ├── dateFormatter.ts  # Reusable logic for dates
│   │   └── fileHandler.ts    # Reusable logic for device file system
│   └── validations/
│   │   └── asoSchema.ts      # Form validation rules (Zod)
├── __tests__/                # Automated test suites
├── App.tsx                   # Application entry point
└── package.json
```

## 🧪 Testing

The project includes automated tests to ensure all business rules (such as tooltip timeouts, file duplications, and conditional form rendering) work as expected. To run the test suite:

```bash
npm run test
```

## 🚀 How to Run the Project

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. We recommend using the latest LTS version.

### 1. Install dependencies
At the root of the repository, install the dependencies:
```bash
npm install
```

### 2. Starting the server (Metro Bundler)
To run the application locally in the development environment:
```bash
npm run start
```
*Alternative: `npx expo start -c` (to clear cache if needed)*

### 3. Running on web, device or emulator
After starting the server, a QR Code will be displayed in your terminal.
- **Physical Device:** Download the **Expo Go** app (available for iOS and Android), scan the QR Code and the app will load.
- **Emulator (Android Studio or Xcode):** Press the `a` key (for Android) or `i` (for iOS) in the terminal where the Metro Bundler is running.

---
*Developed with a focus on quality and scalability.*