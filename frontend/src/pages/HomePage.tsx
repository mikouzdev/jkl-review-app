import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { SelectedDistrictProvider } from "../context/SelectedDistrictContext";
import DistrictList from "../components/DistrictList";
import DistrictReviews from "../components/DistrictReviews";
import ReviewForm from "../components/ReviewForm";
import type { DistrictData } from "../components/District";
import DistrictMap from "../components/DistrictMap";

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [sortOption, setSortOption] = useState<string>("overall");

  async function fetchDistricts() {
    const res = await axios.get<{ districts: DistrictData[] }>(`/api/districts?sort=${sortOption}`);
    setDistricts(res.data.districts);
  }

  useEffect(() => {
    fetchDistricts();
  }, [sortOption]);

  return (
    <SelectedDistrictProvider>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "95vh" }}>
        <DistrictReviews />

        <DistrictMap />

        {/* form panel for creating a review, middle */}
        {showForm && <ReviewForm closeReviewForm={() => setShowForm(false)} />}

        {/* panel: list of reviews, left side */}
        <DistrictList
          districts={districts}
          sortOption={sortOption}
          setSortOption={setSortOption}
          showReviewForm={() => setShowForm(true)}
        />
      </Box>
    </SelectedDistrictProvider>
  );
}

export default HomePage;
