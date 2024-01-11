import { styled } from "@mui/system";
import { AppBar, AppBarProps } from "@mui/material";



export const StyledAppBar = styled(AppBar)<AppBarProps>({
    borderRadius: 15,
    // width: '100%',
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

export const imgStyle = {
    marginLeft: '15px',
}

export const headingStyle = {
    color: 'rgba(0,183,255, 1)',

}


// export default StyledAppBar;