import { Paper, Box, Typography, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";
import DistrictReviewCompact from "./DistrictReviewCompact";

interface ReviewObject {
  id: number;
  title: string;
  avg_safety: number;
  avg_services: number;
  avg_atmosphere: number;
  avg_cost_of_living: number;
  reviews: Review[];
}

interface Review {
  id: number;
  user_id: number;
  safety: number;
  services: number;
  atmosphere: number;
  cost_of_living: number;
  created_at: string;
  comment?: string;
}

function DistrictReviews() {
  const { selectedDistrict } = useSelectedDistrict();
  const [reviews, setReviews] = useState<ReviewObject>();

  useEffect(() => {
    if (!selectedDistrict?.id) return;
    getReviews();
  }, [selectedDistrict?.id]);

  // fetch district reviews for selected district
  async function getReviews() {
    try {
      const response = await axios.get<{ reviews: ReviewObject }>(`/api/districts/${selectedDistrict?.id}/reviews`);
      const reviews = response.data.reviews;
      setReviews(reviews);
    } catch {
      alert("Virhe noutaessa arvosteluita.");
    }
  }

  // show panel only if selecteded a district
  if (!selectedDistrict?.id) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        p: 1,
        maxWidth: 375,
        width: "100%",
        height: "90%",
      }}
    >
      <Paper elevation={2} sx={{ display: "flex", flexDirection: "column", p: 1, width: "100%" }}>
        <Typography align="center" variant="h6" gutterBottom>
          {reviews?.title}
        </Typography>

        <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Turvallisuus
          </Typography>
          <Rating precision={0.5} value={reviews?.avg_safety ?? 0} readOnly />
        </Box>

        <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Palvelut
          </Typography>
          <Rating precision={0.5} value={reviews?.avg_services ?? 0} readOnly />
        </Box>

        <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Ilmapiiri
          </Typography>
          <Rating precision={0.5} value={reviews?.avg_atmosphere ?? 0} readOnly />
        </Box>

        <Box sx={{ display: "flex", p: 1, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Hinta
          </Typography>
          <Rating precision={0.5} value={reviews?.avg_cost_of_living ?? 0} readOnly />
        </Box>
      </Paper>

      <Paper
        elevation={1}
        sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2, width: "100%", overflowY: "scroll" }}
      >
        {reviews?.reviews.map((review) => (
          <DistrictReviewCompact key={review.id} review={review} />
        ))}
      </Paper>
    </Paper>
  );
}

export default DistrictReviews;
