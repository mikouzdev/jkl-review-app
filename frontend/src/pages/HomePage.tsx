import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { SelectedDistrictProvider } from "../context/SelectedDistrictContext";
import DistrictList from "../components/DistrictList";
import DistrictReviews from "../components/DistrictReviews";
import type { DistrictData } from "../components/District";
import DistrictMap from "../components/DistrictMap";
import ReviewFormDialog from "../components/ReviewDialog";

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

        <ReviewFormDialog open={showForm} onClose={() => setShowForm(false)} />

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
