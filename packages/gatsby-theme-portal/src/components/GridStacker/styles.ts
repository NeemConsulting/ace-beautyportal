import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    section: {
      [breakpoints.down('md')]: {
        paddingTop: spacing(5),
      },
      '& img': {
        borderRadius: '50%',
      },
      '& .gatsby-image-wrapper': {
        height: 'auto',
      },
    },
    sectionTitle: {
      color: palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      marginBottom: spacing(1.875),
      [breakpoints.up('md')]: {
        marginBottom: spacing(2),
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    item: {
      textAlign: 'center',
      textDecoration: 'none',
      flexBasis: '24%',
      marginTop: spacing(1),
      marginLeft: spacing(1),
      marginRight: spacing(1),
      [breakpoints.up('md')]: {
        marginLeft: spacing(7.5),
        marginRight: spacing(7.5),
      },
      '&:hover': {
        '& h3': {
          color: palette.secondary.main,
        },
        '& h3 span': {
          backgroundImage: `linear-gradient(120deg,${palette.secondary.main} 0%,${palette.secondary.main} 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% .1875rem',
          backgroundPosition: '0 100%',
        },
      },
    },
    itemCaption: {
      color: palette.common.white,
      '& span': {
        backgroundImage: `linear-gradient(120deg,${palette.secondary.main} 0%,${palette.secondary.main} 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% .1875rem',
        backgroundPosition: '0 100%',
      },
    },
    sectionLink: {
      color: palette.common.white,
      textDecoration: 'none',
      fontSize: '.875rem',
      fontWeight: 700,
      alignSelf: 'flex-start',
      backgroundImage: `linear-gradient(120deg,${palette.secondary.main} 0%,${palette.secondary.main} 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% .1875rem',
      backgroundPosition: '0 100%',
      [breakpoints.up('md')]: {
        fontSize: '1.125rem',
        marginLeft: spacing(3),
        marginBottom: spacing(1),
        alignSelf: 'center',
      },
      '&:hover, &:focus': {
        color: palette.secondary.main,
        backgroundImage: `linear-gradient(120deg,${palette.secondary.main} 0%,${palette.secondary.main} 100%)`,
      },
    },
  })
);
