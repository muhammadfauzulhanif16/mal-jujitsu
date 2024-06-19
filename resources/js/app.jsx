import './bootstrap'
import '../css/app.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/charts/styles.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} ~ ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el)
    
    root.render(
      <MantineProvider
        theme={{
          black: '#0c0c0c',
          // white: '#f3f3f3',
          primaryColor: 'gold',
          autoContrast: true,
          fontFamily: 'Outfit, sans-serif',
          colors: {
            // primary: virtualColor({
            //   name: 'primary',
            //   light: 'red',
            //   dark: 'netral'
            // }),
            neutral: [
              '#0c0c0c',
              '#232323',
              '#3a3a3a',
              '#515151',
              '#686868',
              '#808080',
              '#979797',
              '#aeaeae',
              '#c5c5c5',
              '#dcdcdc',
              '#f3f3f3',
            ],
            gold: [
              '#171400',
              '#463b00',
              '#746200',
              '#a28900',
              '#d1b000',
              '#ffd700',
              '#ffde2e',
              '#ffe65d',
              '#ffed8b',
              '#fff4b9',
              '#fffbe8',
            ],
          },
        }}
      >
        <Notifications position="top-center" />
        
        <App {...props} />
      </MantineProvider>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
