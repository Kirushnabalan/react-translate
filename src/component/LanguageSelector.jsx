import { useState, useEffect, useRef } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const dropdownRef = useRef(null);

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", translatedName: { en: "English", si: "ඉංග්‍රීසි", ta: "ஆங்கிலம்" } },
  { code: "si", name: "සිංහල", flag: "🇱🇰", translatedName: { en: "Sinhala", si: "සිංහල", ta: "சிங்களம்" } },
  { code: "ta", name: "தமிழ்", flag: "🇱🇰", translatedName: { en: "Tamil", si: "தமிழ்", ta: "தமிழ்" } },
];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const langCookie = document.cookie.match(/googtrans=([^;]+)/);
    if (langCookie) setCurrentLanguage(langCookie[1].split('/').pop());

    if (!window.google || !window.google.translate) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }

    const style = document.createElement("style");
    style.textContent = `
      .goog-te-banner-frame,
      .goog-te-menu-frame,
      .goog-te-menu-value,
      .goog-te-gadget,
      .goog-te-combo,
      .skiptranslate {
        display: none !important;
      }
      body { top: 0 !important; }
    `;
    document.head.appendChild(style);

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,si,ta",
            layout: window.google.translate.TranslateElement.InlineLayout.HIDE
          },
          "google_translate_element"
        );
      }
    };

    return () => delete window.googleTranslateElementInit;
  }, []);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    document.cookie = `googtrans=/en/${languageCode}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  const getCurrentLanguage = () => languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="mr-2">{getCurrentLanguage().flag}</span>
        <span className="mr-2">{getCurrentLanguage().name}</span>
        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`${currentLanguage === language.code ? "bg-gray-100 text-gray-900" : "text-gray-700"} group flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
              >
                <span className="mr-3">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
