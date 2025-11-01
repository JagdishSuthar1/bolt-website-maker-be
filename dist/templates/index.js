"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextjsTemplate = exports.reactTemplate = void 0;
exports.reactTemplate = `<boltArtifact id="project-import" title="Project Files">
<boltAction type="file" filePath="eslint.config.js">import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(

  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{{ts,tsx}}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
</boltAction>

<boltAction type="file" filePath="index.html"><!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
</boltAction>

<boltAction type="file" filePath="package.json">{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}</boltAction>

<boltAction type="file" filePath="postcss.config.js">export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};</boltAction>

<boltAction type="file" filePath="tailwind.config.js">/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};</boltAction>

<boltAction type="file" filePath="tsconfig.app.json">{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}</boltAction>

<boltAction type="file" filePath="tsconfig.json">{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}</boltAction>

<boltAction type="file" filePath="tsconfig.node.json">{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}</boltAction>

<boltAction type="file" filePath="vite.config.ts">import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});</boltAction>

<boltAction type="file" filePath="src/App.tsx">import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p>Start prompting (or editing) to see magic happen :)</p>
    </div>
  );
}

export default App;</boltAction>

<boltAction type="file" filePath="src/index.css">@tailwind base;
@tailwind components;
@tailwind utilities;</boltAction>

<boltAction type="file" filePath="src/main.tsx">import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);</boltAction>

<boltAction type="file" filePath="src/vite-env.d.ts">/// <reference types="vite/client" /></boltAction>
</boltArtifact>`;
exports.nextjsTemplate = `<boltArtifact id="project-import" title="Project Files">
<boltAction type="file" filePath="package.json">{
  "name": "nextjs-typescript-starter",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-config-next": "14.2.5",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3"
  }
}</boltAction>

<boltAction type="file" filePath="tsconfig.json">{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}</boltAction>

<boltAction type="file" filePath="next.config.js">/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default nextConfig;</boltAction>

<boltAction type="file" filePath="postcss.config.js">export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};</boltAction>

<boltAction type="file" filePath="tailwind.config.js">/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{{js,ts,jsx,tsx,mdx}}",
    "./components/**/*.{{js,ts,jsx,tsx,mdx}}",
    "./app/**/*.{{js,ts,jsx,tsx,mdx}}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};</boltAction>

<boltAction type="file" filePath="eslint.config.js">import js from "@eslint/js";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  ...next(),
];</boltAction>

<boltAction type="file" filePath="app/layout.tsx">import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next.js + Tailwind Starter",
  description: "Generated with bolt-like template",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}</boltAction>

<boltAction type="file" filePath="app/page.tsx">export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Hello Next.js + Tailwind!</h1>
    </main>
  );
}</boltAction>

<boltAction type="file" filePath="app/globals.css">@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, sans-serif;
}</boltAction>

<boltAction type="file" filePath="next-env.d.ts">/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
</boltAction>
</boltArtifact>`;
