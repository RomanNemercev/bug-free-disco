const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xl: '1239px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // custom colors
        space: '#2f353d',
        zumthor: '#e8f1ff',
        dodger: '#5898ff',
        hoverbtn: 'rgba(255, 255, 255, 0.1)',
        borderAvatar: 'rgba(0, 82, 208, 0.3)',
        athens: '#edeff5',
        'athens-gray': '#f4f6f8',
        'slate-custom': '#79869a',
        red: '#f50a0a',
        gallery: '#f0f0f0',
        bali: '#9098b4',
        violet: '#8d47ff',
        'border-editor': 'rgba(0, 82, 208, 0.2)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        three: '3px',
        plus: '5px',
        ten: '10px',
        fifteen: '15px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
      spacing: {
        '5px': '5px',
        '9px': '9px',
        '11px': '11px',
        '11.5px': '11.5px',
        '12.5px': '12.5px',
        '13px': '13px',
        '15px': '15px',
        '16px': '16px',
        '23px': '23px',
        '25px': '25px',
        '50px': '50px',
        '75px': '75px',
        128: '32rem',
        '275px': '275px',
        '300px': '300px',
        '330px': '330px',
        '400px': '400px',
      },
      maxWidth: {
        '2xl': '100rem',
        'card-width': '235.8px',
      },
      fontSize: {
        '13px': '13px',
        '15px': '15px',
        '25px': '25px',
      },
      padding: {
        btn: '11.5px 15.5px',
        'semi-btn': '11.5px 20px',
        '3px': '3px',
        '4.5px': '4.5px',
        '10px': '10px',
      },
      lineHeight: {
        normal: 'normal',
      },
      boxShadow: {
        'shadow-cards': '0 0 15px 0 rgba(0, 0, 0, 0.05);',
        'shadow-droplist': '0 0 15px 0 rgba(0, 0, 0, 0.15)',
        'shadow-combolist': '0 10px 15px 0 rgba(0, 0, 0, 0.15)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.slate-custom'),
            ul: {
              'padding-left': '25px',
              'margin-bottom': '22px',
            },
            li: {
              margin: '0px',
              p: {
                margin: '0px',
                color: theme('colors.space'),
              },
            },
            h4: {
              'margin-top': '0px',
              'font-size': '15px',
              'font-weight': '500',
              color: theme('colors.space'),
              'margin-bottom': '7px',
            },
          },
        },
      }),
    },
  },
  plugins: [animate, require('@tailwindcss/typography')],
}
