"use client";
import { Button, ButtonProps, styled } from "@mui/material";

const colors = {
  text: "#00bd75",
  background: "#ffffff",
  primary: "#bcf6e2",
  secondary: "#dde5e2",
  accent: "#045f4b",

  shadow: "rgba(0, 0, 0, 0.05)",
};

export const GearButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: colors.accent,
  color: colors.text,
  padding: "1rem",
  width: "100%",
  borderRadius: "1rem",
  boxSizing: "border-box",
  border: `1px solid ${colors.accent}`,
  ":hover": {
    backgroundColor: colors.secondary,
    border: `1px solid ${colors.accent}`,
  },
}));
