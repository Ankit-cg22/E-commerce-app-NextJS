import { makeStyles, withTheme } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: {
     
        backgroundColor: '#203040',
        '& a': {
          color: '#ffffff',
          marginLeft: 10,
        },
        
      },
      appBarSub: {
        display:"flex",
        flexDirection: "row",
        justifyContent:"space-between"
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
      brandName:{
        cursor:"pointer",
      },
      grow: {
        flexGrow :1,
      },
      mainContentSection : {
      },
      section : {
        margin:"10px auto"

      },
      iconButton: {
        backgroundColor: '#00000',
        padding: 5,
        borderRadius: '0 5px 5px 0',
        '& span': {
          color: '#000000',
        }
      },
        searchInput: {
          paddingLeft: 5,
          color: '#000000',
          '& ::placeholder': {
            color: '#606060',
          },
        },
        searchForm: {
          border: '1px solid #ffffff',
          backgroundColor: '#ffffff',
          borderRadius: 5,
        },
        productItem : {
          display:"flex",
          margin:"2em 0"
        },
        corousalImage:{
          minHeight:"2rem"
        },
        carousel:{
          margin:"2rem 0"
        },
        reviewContainer :{
          margin:"10px"
        },
        paginationBar : {
          width: "80%",
          height: "1rem",
          listStyle : "none",
          display : "flex",
          justifyContent:"center",
          '& a':{
            border : "2px solid grey",
            cursor : "pointer",
            fontSize : "2rem",
            padding:"5px",
            margin:"10px",
            color:"#203040",
            fontWeight : "bold",
            borderRadius:"5px"
          },
          margin:"50px"

        },



})

export default useStyles;