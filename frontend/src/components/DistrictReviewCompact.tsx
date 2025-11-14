import { Paper, Typography, Box, Rating } from "@mui/material";

export interface DistrictReviewData {
  id: number;
  user_id: number;
  created_at: string;
  safety: number;
  services: number;
  atmosphere: number;
  cost_of_living: number;
  comment?: string;
}

interface Props {
  review: DistrictReviewData;
}

function DistrictReviewCompact({ review }: Props) {
  const formattedDate = (date?: string) => {
    if (!date) return null;
    const formatted = new Date(date);
    return formatted.toLocaleString();
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", p: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Käyttäjä {review.user_id}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {formattedDate(review.created_at)}
        </Typography>
      </Box>

      <Paper>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Turvallisuus
            </Typography>
            <Rating precision={1} readOnly value={review.safety} />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Palvelut
            </Typography>
            <Rating precision={1} readOnly value={review.services} />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Ilmapiiri
            </Typography>
            <Rating precision={1} readOnly value={review.atmosphere} />
          </Box>

          <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Hinta
            </Typography>
            <Rating precision={1} readOnly value={review.cost_of_living} />
          </Box>
        </Box>

        {review.comment && (
          <Paper sx={{ p: 2, border: 1 }}>
            <Typography variant="body2">{review.comment}</Typography>
          </Paper>
        )}
      </Paper>
    </Paper>
  );
}

export default DistrictReviewCompact;
