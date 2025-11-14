import { Paper, Typography, Box, Rating, TextField, Button } from "@mui/material";
import { useState } from "react";

export interface DistrictReviewData {
  id: number;
  user_id: number;
  districts: { title: string };
  created_at: string;
  safety: number;
  services: number;
  atmosphere: number;
  cost_of_living: number;
  district_id: number;
  updated_at: string;
  comment: string;
}

interface Props {
  review: DistrictReviewData;
  handleEdit: (id: number, updated: DistrictReviewData) => Promise<boolean>;
  handleDelete: (id: number) => Promise<boolean>;
}

function DistrictReview({ review, handleEdit, handleDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState<DistrictReviewData>(review);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const toggleEditing = async () => {
    // check if there are any changes
    setIsEditing(!isEditing);

    if (isEditing) {
      const noChanges =
        review.safety === edited.safety &&
        review.services === edited.services &&
        review.atmosphere === edited.atmosphere &&
        review.cost_of_living === edited.cost_of_living &&
        review.comment === edited.comment;

      if (!noChanges && handleEdit) {
        setIsUpdating(true);
        await handleEdit(review.id, edited);
        setIsUpdating(false);
      }
    }
  };

  const deleteReview = async () => {
    setIsDeleting(true);
    await handleDelete(review.id);
    setIsDeleting(false);
  };

  const formattedDate = (date?: string) => {
    if (!date) return null;
    const formatted = new Date(date);
    return formatted.toLocaleString();
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", maxWidth: 350, p: 1 }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {review.districts.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {formattedDate(review.updated_at) ?? formattedDate(review.created_at)}
        </Typography>
      </Box>

      <Paper>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Turvallisuus
            </Typography>
            <Rating
              precision={1}
              readOnly={!isEditing}
              value={edited.safety}
              onChange={(_, val) => val && setEdited({ ...edited, safety: val })}
            />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Palvelut
            </Typography>
            <Rating
              precision={1}
              readOnly={!isEditing}
              value={edited.services}
              onChange={(_, val) => val && setEdited({ ...edited, services: val })}
            />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Ilmapiiri
            </Typography>
            <Rating
              precision={1}
              readOnly={!isEditing}
              value={edited.atmosphere}
              onChange={(_, val) => val && setEdited({ ...edited, atmosphere: val })}
            />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Hinta
            </Typography>
            <Rating
              precision={1}
              readOnly={!isEditing}
              value={edited.cost_of_living}
              onChange={(_, val) => val && setEdited({ ...edited, cost_of_living: val })}
            />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <TextField
            multiline
            maxRows={4}
            fullWidth
            value={edited.comment ?? ""}
            disabled={!isEditing}
            onChange={(e) => setEdited({ ...edited, comment: e.target.value })}
          />
        </Box>

        <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
          <Button
            loading={isUpdating}
            disabled={isDeleting}
            size="small"
            sx={{ flexGrow: 1 }}
            variant="outlined"
            color="success"
            onClick={toggleEditing}
          >
            {isEditing ? "Tallenna" : "Muokkaa"}
          </Button>
          <Button
            loading={isDeleting}
            disabled={isUpdating}
            size="small"
            variant="outlined"
            color="error"
            onClick={deleteReview}
          >
            Poista
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
}

export default DistrictReview;
