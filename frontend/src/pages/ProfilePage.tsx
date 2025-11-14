import { Typography, Container, Paper, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from "../context/SnackbarContext";
import DistrictReview, { type DistrictReviewData } from "../components/DistrictReview";
import api from "../api/api";

function ProfilePage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackbar();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<DistrictReviewData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetch reviews only if authenticated,
  // navigate to home if not authenticated.
  useEffect(() => {
    if (!authLoading && isAuthenticated) fetchReviews();
    if (!authLoading && !isAuthenticated) navigate("/");
  }, [isAuthenticated, authLoading]);

  async function fetchReviews() {
    try {
      setIsLoading(true);
      const response = await api.get<{ reviews: DistrictReviewData[] }>("/reviews/me");
      const { reviews } = response.data;
      setReviews(reviews);
    } catch {
      showError("Arvostelujen haku epäonnistui.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateReview(reviewId: number, updated: DistrictReviewData): Promise<boolean> {
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
      return true;
    } catch {
      showError("Arvostelun päivitys epäonnistui.");
      return false;
    }
  }

  async function deleteReview(reviewId: number): Promise<boolean> {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      if (response.status === 200) showSuccess("Arvostelu poistettu.");
      fetchReviews();
      return true;
    } catch {
      showError("Arvostelun poistaminen epäonnistui.");
      return false;
    }
  }

  const ProfileHeader = (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Omat arvostelut
      </Typography>
      <Typography align="center" variant="body1">
        {user?.username}
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {reviews.map((review) => (
              <DistrictReview key={review.id} review={review} handleEdit={updateReview} handleDelete={deleteReview} />
            ))}
          </>
        )}
      </Box>
    </Container>
  );
}

export default ProfilePage;
