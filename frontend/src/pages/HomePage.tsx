import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { SelectedDistrictProvider } from "../context/SelectedDistrictContext";
import DistrictList from "../components/DistrictList";
import DistrictReviews from "../components/DistrictReviews";
import type { DistrictData } from "../components/District";
import DistrictMap from "../components/DistrictMap";
import ReviewFormDialog from "../components/ReviewDialog";
import { useSnackbar } from "../context/SnackbarContext";

function HomePage() {
  const { showError } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [sortOption, setSortOption] = useState<string>("overall");
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(false);

  async function fetchDistricts() {
    try {
      setIsDistrictsLoading(true);
      const res = await axios.get<{ districts: DistrictData[] }>(`/api/districts?sort=${sortOption}`);
      setDistricts(res.data.districts);
    } catch {
      showError("Virhe noutaessa kaupunginosia.");
    } finally {
      setIsDistrictsLoading(false);
    }
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
          isLoading={isDistrictsLoading}
        />
      </Box>
    </SelectedDistrictProvider>
  );
}

export default HomePage;
