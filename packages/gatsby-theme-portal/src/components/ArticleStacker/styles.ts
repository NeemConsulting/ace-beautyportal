import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../theme';
export default makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    stacker: {
      paddingTop: spacing(2.5),
      paddingBottom: spacing(2.5),
      position: 'relative',
      [breakpoints.up('md')]: {
        paddingTop: spacing(5),
        paddingBottom: spacing(5),
      },
      '& .gatsby-image-wrapper': {
        height: 180,
        [breakpoints.up('md')]: {
          height: 270,
        },
      },
      '& a': {
        textDecoration: 'none',
      },
    },
    image: {
      height: '80%',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: spacing(1),
      [breakpoints.up('md')]: {
        marginBottom: spacing(1),
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    cardWrapper: {
      paddingBottom: '0.625rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        '& h6 span': {
          backgroundImage: `linear-gradient(120deg,${palette.secondary.main} 0%,${palette.secondary.main} 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% .1875rem',
          backgroundPosition: '0 100%',
        },
      },
    },
    cardFooter: {
      backgroundColor: theme.palette.common.white,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      minHeight: '100px',
      maxHeight: '100px',
    },
    type: {
      backgroundColor: palette.common.white,
      fontSize: '.625rem',
      fontWeight: 600,
      lineHeight: 1.1,
      color: palette.common.black,
      zIndex: 1,
      textTransform: 'uppercase',
      letterSpacing: 1,
      [breakpoints.up('md')]: {
        fontSize: '.75rem',
        paddingTop: spacing(0.75),
      },
    },
    headline: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: palette.common.black,
      [breakpoints.up('md')]: {
        fontSize: '1.125rem',
      },
    },
  })
);
