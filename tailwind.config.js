/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'tablet': '750px',
                'pc': '990px',
                'wide': '1440px',
            },
            fontFamily: {
                // Google Fonts (Available)
                'inter': ['Inter', 'sans-serif'],
                'lato': ['Lato', 'sans-serif'],
                'open-sans': ['Open Sans', 'sans-serif'],
                'oswald': ['Oswald', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],

                // Custom Fonts (Imported via fonts.css)
                'aeonik': ['Aeonik', 'sans-serif'],
                'abc-arizona': ['ABC Arizona Flare', 'serif'],
                'isl-andvari': ['ISL Andvari', 'sans-serif'],
            },
            colors: {
                // Primary Brand Colors
                'primary': '#A40011',       // Đỏ đậm
                'primary-dark': '#A11C20',  // Đỏ sẫm
                'primary-deep': '#50000B',  // Đỏ nâu đậm

                // Background Tones
                'cream': '#F9F2ED',         // Kem nhạt
                'brown-light': '#EAE0D2',   // Nâu nhạt
                'pink-light': '#F5EAEA',    // Hồng nhạt
                'pink-lighter': '#FFF8F8',  // Hồng rất nhạt

                // Neutrals
                'dark': '#333333',          // Xám đậm
                'gray-border': '#E8E8E8',   // Xám nhạt (border)

                // Alpha/Transparent Colors (Extended)
                'pink-transparent': 'rgba(242, 224, 221, 0.5)',
                'black-70': 'rgba(0, 0, 0, 0.7)',
                'black-60': 'rgba(0, 0, 0, 0.6)',
                'border-gray-blue': 'rgba(62, 85, 105, 0.2)',
                'border-red-brown': 'rgba(80, 0, 11, 0.12)',
            },
            zIndex: {
                '99': '99',
                '100': '100',
            },
        },
    },
    plugins: [],
    corePlugins: {
        container: false,
    }
}
