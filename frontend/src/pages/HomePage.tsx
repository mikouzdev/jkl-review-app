import { Box } from "@mui/material";
import { SelectedDistrictProvider } from "../context/SelectedDistrictContext";
import DistrictList from "../components/DistrictList";
import DistrictReviews from "../components/DistrictReviews";
import ReviewForm from "../components/ReviewForm";
import { useState, useEffect } from "react";
import axios from "axios";
import type { DistrictData } from "../components/District";

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [sortOption, setSortOption] = useState<string>("overall");

  async function fetchDistricts() {
    const res = await axios.get<{ districts: DistrictData[] }>(`/api/districts?sort=${sortOption}`);
    setDistricts(res.data.districts);
  }

  // fetch on sort change
  useEffect(() => {
    fetchDistricts();
  }, [sortOption]);

  return (
    <SelectedDistrictProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          height: "95vh",
          p: 2,
          gap: 1,
        }}
      >
        <DistrictReviews />
        {showForm && <ReviewForm closeReviewForm={() => setShowForm((showForm) => !showForm)} />}

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
