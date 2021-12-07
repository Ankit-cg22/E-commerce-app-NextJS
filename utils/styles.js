import { makeStyles, withTheme } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#203040',
        '& a': {
          color: '#ffffff',
          marginLeft: 10,
        },
      },
      main: {
        minHeight: '80vh',
      },
      footer: {
        backgroundColor: '#203040',
        padding: 10,
        textAlign: 'center',
        color:'white' 
      },
})

export default useStyles;