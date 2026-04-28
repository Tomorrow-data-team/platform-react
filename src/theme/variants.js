import merge from "deepmerge";
import { green, grey, indigo, red } from "@mui/material/colors";
import { THEMES } from "@/constants";

const customBlue = {
  50: "#e9f0fb",
  100: "#c8daf4",
  200: "#a3c1ed",
  300: "#7ea8e5",
  400: "#6395e0",
  500: "#4782da",
  600: "#407ad6",
  700: "#376fd0",
  800: "#2f65cb",
  900: "#2052c2 ",
};

const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    mode: "light",
    primary: {
      main: customBlue[700],
      contrastText: "#FFF",
    },
    secondary: {
      main: customBlue[500],
      contrastText: "#FFF",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  header: {
    color: grey[500],
    background: "#FFF",
    search: {
      color: grey[800],
    },
    indicator: {
      background: customBlue[600],
    },
  },
  footer: {
    color: grey[500],
    background: "#FFF",
  },
  sidebar: {
    color: grey[200],
    background: "#233044",
    header: {
      color: grey[200],
      background: "#233044",
      brand: {
        color: customBlue[500],
      },
    },
    footer: {
      color: grey[200],
      background: "#1E2A38",
    },
    badge: {
      color: "#FFF",
      background: customBlue[500],
    },
  },
};

const darkVariant = merge(defaultVariant, {
  name: THEMES.DARK,
  palette: {
    mode: "dark",
    primary: {
      main: "#6e40f8",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#6e40f8",
      contrastText: "#FFF",
    },
    background: {
      default: "#01004a",
      paper: "#01004a",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.95)",
      secondary: "rgba(255, 255, 255, 0.5)",
    },
  },
  header: {
    color: grey[300],
    background: "#010028",
    search: {
      color: grey[200],
    },
  },
    sidebar: {
    color: grey[200],
    background: "#010028",
    header: {
      color: grey[200],
      background: "#010028",
      brand: {
        color: customBlue[500],
      },
    }},
  footer: {
    color: grey[300],
    background: "#01004a",
  },
});

const lightVariant = merge(defaultVariant, {
  name: THEMES.TMRW,
  palette: {
    mode: "light",
    primary: {
      main: "#6e40f8",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#6e40f8",
      contrastText: "#FFF",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFF",
    },
  },
  header: {
    color: grey[200],
    background: "#FFF",
    search: {
      color: grey[100],
    },
    indicator: {
      background: red[700],
    },
  },
  sidebar: {
    color: grey[100],
    background: "#01004a",
    header: {
      color: "#FFF",
      background: "#01004a",
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: grey[800],
      background: "#F7F7F7",
    },
  },
    footer: {
    color: grey[300],
    background: "#F7F9FC",
  },
});


const blueVariant = merge(defaultVariant, {
  name: THEMES.BLUE,
  palette: {
    mode: "light",
  },
  sidebar: {
    color: "#FFF",
    background: customBlue[700],
    header: {
      color: "#FFF",
      background: customBlue[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: customBlue[800],
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const greenVariant = merge(defaultVariant, {
  name: THEMES.GREEN,
  palette: {
    primary: {
      main: "#01004a",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#01004a",
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: "#01004a",
    },
  },
  sidebar: {
    color: "#FFF",
    background: green[700],
    header: {
      color: "#FFF",
      background: green[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: green[800],
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const indigoVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: indigo[400],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: indigo[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: indigo[700],
    header: {
      color: "#FFF",
      background: indigo[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: indigo[800],
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const TMRWVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: indigo[400],
      contrastText: "#FFF",
    },
  },
  header: {
    indicator: {
      background: indigo[600],
    },
  },
  sidebar: {
    color: "#FFF",
    background: indigo[700],
    header: {
      color: "#FFF",
      background: indigo[800],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: "#FFF",
      background: indigo[800],
    },
    badge: {
      color: "#000",
      background: "#FFF",
    },
  },
});

const variants = [
  defaultVariant,
  darkVariant,
  lightVariant,
  blueVariant,
  greenVariant,
  indigoVariant,
  TMRWVariant,
];

export default variants;
