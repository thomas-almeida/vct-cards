
import presetQuick from 'franken-ui/shadcn-ui/preset-quick'
import ui from "franken-ui"


ui({
  components: {
    'form-range': {
      hooks: {}
    },
    form: {
      hooks: {},
      media: true
    },
    button: {
      hooks: {}
    },
    label: {
      hooks: {}
    }
  }
})

/** @type {import('tailwindcss').Config} */
export default {
  presets: [presetQuick({ theme: "zinc" })],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
