import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { SubscriptionPopupInterface } from './model';
import SocialMenu from '../SocialMenu';
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
    }
  `);

  console.log('storageValue', window.localStorage.getItem('popup'));

  // React.useEffect(() => {
  //   if (
  //     typeof window !== 'undefined' &&
  //     window.localStorage.getItem('popup') === 'true'
  //   ) {
  //     setOpen(false);
  //   }
  //   setOpen(true);
  // }, []);

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
          style={{ border: '1.25rem solid #2c5270', borderTopWidth: '1rem' }}
        >
          <DialogTitle id="form-dialog-title">
            <h2>Stay inspired with trends & tutorials to suit you.</h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="form-dialog-description">
              Sign up to our newsletter & get exclusive hair care tips & tricks
              from the experts
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
          <DialogActions>
            <Button className={classes.SecondaryButton} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={classes.PrimaryButton} onClick={handleClose}>
              Subscribe
            </Button>
          </DialogActions>
          <SocialMenu links={data.linksInfo} />
        </div>
      </Dialog>
    </div>
  );
};

export default SubscriptionPopup;
