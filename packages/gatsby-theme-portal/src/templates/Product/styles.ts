import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    mainGrid: {
      marginTop: spacing(10),
    },
    productImage: {
      display: 'block',
      textAlign: 'center',
    },
    strong: {
      fontWeight: 'bold',
    },
    accordion: {
      width: '100%',
      cursor: 'pointer',
      paddingTop: spacing(0.75),
      paddingBottom: spacing(0.75),
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      fontWeight: 'bold',
      color: palette.common.black,
      overflow: 'hidden',
      backgroundColor: '#f4f4f4',
      '& .header': {
        width: '100%',
        border: 'none',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        cursor: 'pointer',
        lineHeight: 'inherit',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        '& .up': {
          transition: `all .2s`,
          transform: `rotate(0deg)`,
        },
        '& .down': {
          transition: `all .2s`,
          transform: `rotate(180deg)`,
        },
      },
      '& .contentCollapse': {
        maxHeight: '0',
        overflow: 'hidden',
        fontWeight: 'normal',
        transition: 'max-height .3s',
      },
      '& .contentExpand': {
        fontWeight: 'normal',
        maxHeight: '100vh',
        transition: 'max-height .3s',
      },
    },
    readNextTitle: {
      position: 'relative',
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.1,
      margin: 0,
      [breakpoints.up('md')]: {
        fontSize: '2rem',
      },

      '&:before': {
        content: '""',
        height: 20,
        width: '100%',
        position: 'absolute',
        zIndex: -1,
        bottom: 0,
        margin: 'auto',
        backgroundImage: `linear-gradient(120deg,${palette.secondary.light} 0%,${palette.secondary.light} 100%)`,
      },
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: spacing(1.25),
      margin: spacing(1.25),
      textAlign: 'left',
      color: palette.text.secondary,
    },
    carouselArrow: {
      position: 'absolute',
      zIndex: 2,
      top: 'calc(50% - 50px)',
      width: 77,
      height: 77,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
    },
    socialWrapper: {
      '& svg': {
        fill: 'black',
      },
    },
    marginRight: {
      marginRight: spacing(1),
    },
  })
);
