import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  pt: 2,
  px: 4,
  pb: 3,
};

interface IGearModal {
  modalOpen: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function GearModal({
  modalOpen,
  handleClose,
  title,
  children,
}: IGearModal) {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...style, width: 200 }}>
        <h2 id="title">{title}</h2>
        {children}
      </Box>
    </Modal>
  );
}
