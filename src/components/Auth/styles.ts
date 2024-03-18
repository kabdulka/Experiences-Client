import { Theme } from "@mui/material"
import { CSSProperties } from "react";

export const paper = (theme: Theme) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
});

export const avatarStyle = (theme: Theme) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
});

export const form: CSSProperties = {
    width: '100%',
    marginTop: "3rem",
    // border: "red 1px solid"
}

export const submit = (theme: Theme) => ({
    margin: theme.spacing(3, 0, 2),
})

export const googleButton = (theme: Theme) => ({
    marginBottom: theme.spacing(2)
})