import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

interface IGearSelect {
  children: JSX.Element[];
  labelId: string;
  id: string;
  value: string;
  onChange?: () => void;
}

export const GearSelect = ({
  labelId,
  id,
  value,
  onChange,
  children,
}: IGearSelect) => {
  return (
    <Select
      sx={{
        color: "var(--accent)",
        fontWeight: "600",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--accent)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--text)",
        },
      }}
      labelId={labelId}
      id={id}
      value={value}
      onChange={onChange}
    >
      {children}
    </Select>
  );
};
