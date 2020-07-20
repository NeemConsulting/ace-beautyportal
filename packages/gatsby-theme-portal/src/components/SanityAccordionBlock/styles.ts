import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    section: {
      backgroundColor: palette.common.white,
      margin: 'auto',
      borderTop: `1px solid ${palette.common.black}`,
      [breakpoints.up('md')]: {
        width: '78%',
      },
      '& button': {
        width: '100%',
        border: 'none',
        position: 'relative',
        overflow: 'visible',
        backgroundColor: 'transparent',
        fontSize: 'inherit',
        fontWeight: 'normal',
        lineHeight: 'normal',
        textAlign: 'left',
        letterSpacing: 'inherit',
        cursor: 'pointer',
      },
    },
    accordion: {
      cursor: 'pointer',
      overflow: 'hidden',
      '& .header': {
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
        fontWeight: 'normal',
        transition: 'max-height .3s',
      },
      '& .contentExpand': {
        fontWeight: 'normal',
        maxHeight: '100vh',
        transition: 'max-height .3s',
      },
    },
  })
);
