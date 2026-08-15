import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customColor: Palette['primary'];
  }
  interface PaletteOptions {
    customColor?: PaletteOptions['primary'];
  }
}

// MUI 버튼 color 속성에 커스텀 이름 추가하고 싶다면 (선택사항)
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    customColor: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#13a085',
    },
    // 새로운 컬러 추가
    // customColor: {
    //   main: '#13a085',
    //   contrastText: '#ffffff',
    // },
  },
});
