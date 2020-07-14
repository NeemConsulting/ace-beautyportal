import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(({ palette }: Theme) =>
  createStyles({
    PrimaryButton: {
      fontSize: '1.125rem',
      fontWeight: 700,
      width: 180,
      height: 50,
      marginLeft: -1,
      cursor: 'pointer',
      backgroundColor: palette.secondary.main,
      border: `1px solid ${palette.secondary.main}`,
      borderRadius: 0,
      color: palette.common.black,
      position: 'relative',
      transform: 'perspective(1px) translateZ(0)',
      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: palette.common.black,
        transform: 'scaleX(0)',
        transformOrigin: '0 50%',
        transitionProperty: 'transform',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-out',
      },
      '&:hover': {
        borderColor: palette.common.black,
        color: palette.common.white,
        '&:before': {
          transform: 'scaleX(1)',
        },
      },
    },
    AlignBtn: {
      justifyContent: 'center',
    },
    Border: {
      border: '1.25rem solid #2c5270',
      borderTopWidth: '3rem',
    },
    Follow: {
      fontSize: '1.125rem',
      fontWeight: 700,
      alignSelf: 'center',
      flex: '0 0 auto',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem !important',
      marginBottom: '.5rem !important',
    },
    Description: {
      marginTop: -30,
    },
  })
);
