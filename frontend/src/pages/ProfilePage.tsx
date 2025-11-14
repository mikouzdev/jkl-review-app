import { Typography, Container, Paper, Box } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "../context/SnackbarContext";
import DistrictReview, { type DistrictReviewData } from "../components/DistrictReview";
import api from "../api/api";

function ProfilePage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackbar();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [reviews, setReviews] = useState<DistrictReviewData[]>([]);

  // navigate to home page if user is not logged in
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    fetchReviews();
  }, [isAuthenticated, isLoading]);

  async function fetchReviews() {
    try {
      const response = await api.get<{ reviews: DistrictReviewData[] }>("/reviews/me");
      const { reviews } = response.data;
      setReviews(reviews);
      showSuccess("Arvostelut ladattu.");
    } catch {
      showError("Arvostelujen haku epäonnistui.");
    }
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
      const response = await api.put(`/reviews/${reviewId}`, body);
      if (response.status === 200) showSuccess("Arvostelu päivitetty.");
      fetchReviews();
    } catch {
      showError("Arvostelun päivitys epäonnistui.");
    }
  }

  async function deleteReview(reviewId: number) {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      if (response.status === 200) showSuccess("Arvostelu poistettu.");
      fetchReviews();
    } catch {
      showError("Arvostelun poistaminen epäonnistui.");
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
