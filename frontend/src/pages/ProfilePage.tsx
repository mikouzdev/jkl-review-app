import { Typography, Container, Paper, Box } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DistrictReview, { type DistrictReviewData } from "../components/DistrictReview";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<DistrictReviewData[]>([]);

  // navigate to home page if user is not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    fetchReviews();
  }, [isAuthenticated]);

  if (!user || !isAuthenticated) return null;

  async function fetchReviews() {
    const res = await axios.get<{ reviews: DistrictReviewData[] }>("/api/reviews/me");
    const { reviews } = res.data;
    setReviews(reviews);
  }

  async function updateReview(reviewId: number, updated: DistrictReviewData) {
    const body = {
      ratings: {
        safety: updated.safety,
        services: updated.services,
        atmosphere: updated.atmosphere,
        cost_of_living: updated.cost_of_living,
      },
      comment: updated.comment,
    };

    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, body);
      if (response.status === 200) alert("Arvostelun päivitys onnistui.");
      fetchReviews();
    } catch {
      alert("Arvostelun päivitys epäonnistui.");
    }
  }

  async function deleteReview(reviewId: number) {
    try {
      const response = await axios.delete(`/api/reviews/${reviewId}`);
      if (response.status === 200) alert("Arvostelun poistaminen onnistui.");
      fetchReviews();
    } catch {
      alert("Arvostelun poistaminen epäonnistui.");
    }
  }

  const ProfileHeader = (
    <Paper elevation={3}>
      <Typography
        variant="h5"
        sx={{
          p: 2,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        Hei, {user?.username}!
      </Typography>
    </Paper>
  );

  return (
    <Container
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {ProfileHeader}
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
        {reviews.map((review) => (
          <DistrictReview key={review.id} review={review} handleEdit={updateReview} handleDelete={deleteReview} />
        ))}
      </Box>
    </Container>
  );
}

export default ProfilePage;
