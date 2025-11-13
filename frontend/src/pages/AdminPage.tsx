import axios from "axios";
import { Container, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import DistrictReview, { type DistrictReviewData } from "../components/DistrictReview";
import { useSnackbar } from "../context/SnackbarContext";

function AdminPage() {
  const { showError, showSuccess } = useSnackbar();
  const { isAdmin, isLoading } = useAuth();

  const [reviews, setReviews] = useState<DistrictReviewData[]>();
  useEffect(() => {
    if (isLoading) return;
    if (!isAdmin) return;
    fetchAllReviews();
  }, [isLoading]);

  async function fetchAllReviews() {
    const response = await axios.get("/api/reviews?limit=20");
    setReviews(response.data.reviews);
  }

  async function updateReviewComment(reviewId: number, updated: DistrictReviewData) {
    const updatedComment = { comment: updated.comment };

    try {
      const response = await axios.patch(`/api/reviews/${reviewId}`, updatedComment);
      if (response.status === 200) showSuccess("Kommentti päivitetty.");
      fetchAllReviews();
    } catch {
      showError("Kommentin päivitys epäonnistui.");
    }
  }

  async function deleteReview(reviewId: number) {
    try {
      const response = await axios.delete(`/api/reviews/${reviewId}`);
      if (response.status === 200) showSuccess("Arvostelu poistettu.");
      fetchAllReviews();
    } catch {
      showError("Arvostelun poistaminen epäonnistui.");
    }
  }

  if (!isAdmin) return null;
  if (isLoading) return <Typography>Ladataan...</Typography>;

  return (
    <Container sx={{ p: 1 }}>
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="h4" align="center">
          Admin
        </Typography>
      </Paper>

      <Paper sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between", p: 2 }}>
        {reviews?.map((review) => (
          <DistrictReview
            key={review.id}
            review={review}
            handleEdit={updateReviewComment}
            handleDelete={deleteReview}
          />
        ))}
      </Paper>
    </Container>
  );
}

export default AdminPage;
