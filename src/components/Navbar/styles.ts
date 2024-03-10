import { display, styled, useTheme } from "@mui/system";
import { AppBar, AppBarProps, Toolbar, ToolbarProps } from "@mui/material";
// import { deepPurple } from "@mui/material/colors";

export const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    borderRadius: 15,
    // width: '100%',
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
}));

export const imgStyle = {
    // marginLeft: '10px',
    // marginTop: '5px',
};

export const headingStyle = {
    color: 'rgba(0,183,255,1)',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
};

export const brandContainer = {
    // border: "red solid 1px",
    display: 'flex',
    gap: "0.5rem",
    alignItems: 'center',
};

export const StyledToolBar = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
    display: 'flex',
    // border: "blue solid 1px",
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('md')]: {
        // flexDirection: 'column',
        // border: "red solid 1px",
        width: 'auto',
        display: 'flex',
      },
}))

export const profile = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
}

export const userName = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
}

export const logout = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
}

// export const purple = {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
// }

