import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    section: {
      paddingBottom: spacing(2.5),
      [breakpoints.up('md')]: {
        paddingTop: spacing(5),
        paddingBottom: spacing(5),
      },
      '& img': {
        borderRadius: '50%',
      },
      '& .gatsby-image-wrapper': {
        height: 'auto',
      },
    },
  })
);
