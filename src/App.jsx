import React from "react";
import LanguageSelector from "./component/LanguageSelector"; // adjust path if needed

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" translate="no">React Language Selector Demo</h1>
        <div translate="no">
        <LanguageSelector />
        </div>
      </header>
 
      {/* Main Content */}
      <main className="space-y-8">
        {/* Section 1 */}
        <section className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Our Website</h2>
          <p>
            Hello! This page demonstrates a custom React language selector
            component that allows you to switch between English, Sinhala, and Tamil.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">About This Component</h2>
          <p>
            The component shows a language selector button, opens a dropdown
            menu with supported languages,
            and loads Google Translate in the background. The default Google Translate
            UI is hidden to keep the interface clean.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside">
            <li>Language selector button</li>
            <li>Dropdown menu with supported languages</li>
            <li>Loads Google Translate in the background</li>
            <li>Clean UI without Google’s default widget</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Try It Out!</h2>
          <p>
            Use the language selector at the top-right corner to switch languages.
            The page will reload and display translations for English, Sinhala, or Tamil.
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;
