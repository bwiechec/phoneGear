"use client";

import { styled } from "@mui/material";
import { Badge, badgeClasses } from "@mui/base/Badge";

export const GearBadge = styled(Badge)(
  ({ theme }) => `
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-self: center;
  margin: 0;
  padding: 0;
  color: var(--text);

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    line-height: 12px;
    white-space: nowrap;
    text-align: center;
    font-size: 10px;
    border-radius: 12px;
    line-height: 15px;
    background: var(--accent);
    transform: translate(55%, -60%);
    transform-origin: 100% 0;
  }

  & .${badgeClasses.invisible} {
    opacity: 0;
    pointer-events: none;
  }
  `
);
