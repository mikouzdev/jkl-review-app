import { Dialog, DialogContent } from "@mui/material";
import ReviewForm from "./ReviewForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

function ReviewFormDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ p: 0 }}>
        <ReviewForm closeReviewForm={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default ReviewFormDialog;
