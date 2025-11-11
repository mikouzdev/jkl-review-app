import { Box, Typography, Rating, Button, Paper } from "@mui/material";

export interface DistrictData {
  id: number;
  title: string;
  avg_overall: number;
  avg_safety: number;
  avg_atmosphere: number;
  avg_cost_of_living: number;
  avg_services: number;
  rating_count: number;
}

interface DistrictProps {
  district: DistrictData;
  sortedAvg: number;
  handleShowReviews: (id: number, title: string) => void;
  handleShowReviewForm: (id: number, title: string) => void;
}

function District({ district, sortedAvg, handleShowReviewForm, handleShowReviews }: DistrictProps) {
  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", maxWidth: 350, p: 1 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", gap: 2, p: 1 }}>
        <Typography variant="body1" sx={{ flex: 1 }}>
          {district.title}
        </Typography>
        <Rating value={sortedAvg} precision={0.5} readOnly />
        <Typography variant="body2">({district.rating_count})</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", p: 1 }}>
        <Button size="small" variant="outlined" onClick={() => handleShowReviewForm(district.id, district.title)}>
          Arvostele
        </Button>
        <Button size="small" variant="outlined" onClick={() => handleShowReviews(district.id, district.title)}>
          Näytä arvostelut
        </Button>
      </Box>
    </Paper>
  );
}

export default District;
