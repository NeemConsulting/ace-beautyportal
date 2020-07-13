import React from 'react';

export const MyContext = React.createContext();

export const MyProvider = props => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let visited =
      typeof window !== 'undefined' && window.localStorage['alreadyVisited'];
    if (visited) {
      setOpen(false);
      //do not view Popup
    } else {
      //this is the first time

      window.localStorage['alreadyVisited'] = true;
      setOpen(true);
    }
  }, []);

  return (
    <MyContext.Provider value={[open, setOpen]}>
      {props.children}
    </MyContext.Provider>
  );
};
