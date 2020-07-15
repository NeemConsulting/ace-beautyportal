import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';
import { SubscriptionPopupInterface } from './model';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';
import SocialMenu from '../SocialMenu';
import useStyles from './styles';

const styles = theme => ({
  root: {
    fontSize: '2rem',
    padding: '0px 24px',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'white',
  },
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const SubscriptionPopup: FunctionComponent<SubscriptionPopupInterface> = ({
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query subscriptionPopupSocialLinks {
      linksInfo: sanityBrandInfo {
        pinteresturl
        twitterurl
        youtubeurl
        facebookurl
        instaurl
      }
      subscriptionInfo: sanityNewsletterBlock(
        name: { eq: "Newsletter Promo" }
      ) {
        name
        headline
        _rawBody(resolveReferences: { maxDepth: 10 })
        ctaLabel
      }
    }
  `);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <div
          style={{ border: '1.25rem solid #2c5270', borderTopWidth: '3rem' }}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <h2 className={classes.Title}>{data.subscriptionInfo.headline}</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.Description}
              id="form-dialog-description"
            >
              <BlockContent
                serializers={blockTypeDefaultSerializers}
                blocks={data.subscriptionInfo._rawBody}
              />
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions className={classes.AlignBtn}>
            <Button className={classes.PrimaryButton} onClick={handleClose}>
              {data.subscriptionInfo.ctaLabel}
            </Button>
          </DialogActions>
          <>
            <Typography className={classes.Follow} variant="h6">
              Follow us
            </Typography>
            <SocialMenu links={data.linksInfo} popupSocial="true" />
          </>
        </div>
      </Dialog>
    </div>
  );
};

export default SubscriptionPopup;
