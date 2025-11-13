import axios from "axios";
import { Paper, Rating, TextField, Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";

interface Ratings {
  safety: number;
  services: number;
  atmosphere: number;
  cost_of_living: number;
}

interface ReviewSubmitData {
  ratings: Ratings;
  comment?: string;
}

interface Props {
  closeReviewForm: () => void;
}

const ratingBoxStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  p: 1,
  width: "100%",
  borderBottom: 1,
};

function ReviewForm({ closeReviewForm }: Props) {
  const { selectedDistrict } = useSelectedDistrict();
  const [ratings, setRatings] = useState<Ratings>({
    safety: 0,
    services: 0,
    atmosphere: 0,
    cost_of_living: 0,
  });

  const [comment, setComment] = useState<string>("");

  function handleRatingChange(field: keyof Ratings, value: number | null) {
    setRatings({ ...ratings, [field]: value ?? 0 });
  }

  // submit review
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //validate
    if (ratings.safety === 0 || ratings.services === 0 || ratings.atmosphere === 0 || ratings.cost_of_living === 0)
      return alert("Arvioi kaikki kriteerit.");

    const data: ReviewSubmitData = {
      ratings,
      comment: comment || undefined,
    };

    try {
      const response = await axios.post(`/api/districts/${selectedDistrict?.id}`, data);
      if (response.status === 201) alert("Arvostelun lähettäminen onnistui.");

      setRatings({ safety: 0, services: 0, atmosphere: 0, cost_of_living: 0 });
      setComment("");
      closeReviewForm();
    } catch {
      alert("Virhe lähettäessä arvostelua.");
    }
  }

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Box sx={{ p: 1, width: "100%" }}>
        <Typography variant="h6" align="center">
          {selectedDistrict?.title}
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          p: 1,
        }}
      >
        <Box sx={ratingBoxStyle}>
          <Typography>Turvallisuus</Typography>
          <Rating value={ratings.safety} name="safety" onChange={(_, value) => handleRatingChange("safety", value)} />
        </Box>

        <Box sx={ratingBoxStyle}>
          <Typography>Palvelut</Typography>
          <Rating
            value={ratings.services}
            name="services"
            onChange={(_, value) => handleRatingChange("services", value)}
          />
        </Box>

        <Box sx={ratingBoxStyle}>
          <Typography>Ilmapiiri</Typography>
          <Rating
            value={ratings.atmosphere}
            name="atmosphere"
            onChange={(_, value) => handleRatingChange("atmosphere", value)}
          />
        </Box>

        <Box sx={ratingBoxStyle}>
          <Typography>Hinta</Typography>
          <Rating
            value={ratings.cost_of_living}
            name="cost_of_living"
            onChange={(_, value) => handleRatingChange("cost_of_living", value)}
          />
        </Box>
      </Paper>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          px: 1,
          width: "100%",
        }}
      >
        <Typography variant="body1" align="center">
          Kommentti
        </Typography>
        <TextField
          value={comment}
          fullWidth
          variant="filled"
          name="comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%", p: 1 }}>
          <Button variant="contained" size="small" onClick={closeReviewForm}>
            Sulje
          </Button>
          <Button type="submit" variant="contained" size="small">
            Lähetä arvostelu
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
}

export default ReviewForm;
