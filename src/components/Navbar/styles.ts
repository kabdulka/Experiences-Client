import { styled } from "@mui/system";
import { AppBar, AppBarProps } from "@mui/material";
// import { deepPurple } from "@mui/material/colors";

export const StyledAppBar = styled(AppBar)<AppBarProps>({
    borderRadius: 15,
    // width: '100%',
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
});

export const imgStyle = {
    marginLeft: '15px',
};

export const headingStyle = {
    color: 'rgba(0,183,255, 1)',
};

export const brandContainer = {
    display: 'flex',
    alignItems: 'center',
};

export const toolbar = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
};

export const profile = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
}

export const userName = {
    display: 'flex',
    alignItems: 'center',
}

// export const purple = {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
// }

