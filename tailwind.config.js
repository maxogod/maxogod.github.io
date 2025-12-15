/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary': '#388fc7',
                'secondary': '#125199',
                'tertiary': '#073d7a',
                'quaternary': '#012042',

                'light-background-p1': '#388fc7',
                'light-background-p2': '#125199',
                'light-background-p3': '#073d7a',
                'light-background-p4': '#012042',

                'dark-background-p1': '#1a425c',
                'dark-background-p2': '#0f2d40',
                'dark-background-p3': '#0b2333',
                'dark-background-p4': '#051621',

                'light-primary': '#f8f8f8',
                'light-secondary': '#f8f8f8',

                'dark-primary': '#f8f8f8',
                'dark-secondary': '#f8f8f8',

                'light-text': '#f8f8f8',

                'dark-text': '#f8f8f8',
            },
        },
    },
    plugins: [],
    safelist: [
        'bg-pink-400',
        'bg-green-300',
        'bg-green-500',
        'bg-blue-400',
        'bg-red-400',
        'bg-blue-200',
        'bg-blue-300',
        'bg-zinc-500',
        'bg-red-300',
        'bg-fuchsia-400',
        'bg-purple-500',
        'bg-yellow-500',
        'bg-slate-300',
        'bg-slate-500',
        'bg-orange-400',
        'bg-orange-500',
        'bg-yellow-300',
        'bg-blue-500',
        'bg-orange-700',
        'bg-orange-400',
        'bg-yellow-200',
        'bg-blue-600',
        'bg-slate-500',
        'bg-pink-300',
        'bg-blue-300',
        'bg-green-500',
        'bg-blue-700',
        'bg-yellow-400',
        'bg-indigo-400',
        'bg-sky-300',
        'bg-purple-400',
        'bg-rose-400',
        'bg-emerald-400',
        'bg-cyan-400',
        'bg-cyan-500',
        'bg-blue-600',
        "bg-orange-300",
        "bg-lime-400",
    ]
}

