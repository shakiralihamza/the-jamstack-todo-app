import {createTheme} from '@mui/material/styles';
import {indigo, purple} from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#3f4ab0',
            main: '#1A227D',
            dark: '#030741',
        },
        secondary: {
            main: '#B4009D'
        }
    },
});

export default theme;
