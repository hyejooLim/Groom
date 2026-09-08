import { useTheme, useMediaQuery } from '@mui/material';

const useBreakdown = () => {
  const theme = useTheme();

  // 0px ~ 899.95px (모바일)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 900px ~ 1199.95px (태블릿만 해당)
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // 1200px ~ (데스크탑)
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return { isMobile, isTablet, isDesktop };
};

export default useBreakdown;
