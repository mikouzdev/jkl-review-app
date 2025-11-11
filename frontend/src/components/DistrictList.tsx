import { Select, Paper, FormControl, InputLabel, MenuItem, Typography, type SelectChangeEvent } from "@mui/material";
import District, { type DistrictData } from "./District";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";

interface Props {
  showReviewForm: () => void;
  districts: DistrictData[];
  sortOption: string;
  setSortOption: (sort: string) => void;
}

function DistrictList({ showReviewForm, districts, sortOption, setSortOption }: Props) {
  const { selectedDistrict, setSelectedDistrict } = useSelectedDistrict();

  function handleSort(e: SelectChangeEvent<string>) {
    if (sortOption === e.target.value) return;
    setSortOption(e.target.value); // parent handles fetching
  }

  function handleShowReviewForm(districtId: number, districtTitle: string) {
    showReviewForm();
    if (selectedDistrict?.id === districtId) return;
    setSelectedDistrict({ id: districtId, title: districtTitle });
  }

  function handleShowReviews(districtId: number, districtTitle: string) {
    if (districtId === selectedDistrict?.id) return;
    setSelectedDistrict({ id: districtId, title: districtTitle });
  }

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
      <Typography align="center" variant="h5">
        Kaupunginosat
      </Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-label">Järjestys</InputLabel>
        <Select labelId="sort-label" value={sortOption} onChange={handleSort} label="Järjestys">
          <MenuItem value={"overall"}>Yleinen</MenuItem>
          <MenuItem value={"safety"}>Turvallisuus</MenuItem>
          <MenuItem value={"atmosphere"}>Ilmapiiri</MenuItem>
          <MenuItem value={"services"}>Palvelut</MenuItem>
          <MenuItem value={"cost_of_living"}>Hinta</MenuItem>
        </Select>
      </FormControl>

      <Paper
        elevation={1}
        sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2, maxHeight: "75vh", overflowY: "scroll" }}
      >
        {districts.map((district) => {
          const sortedAvg = Number(district[`avg_${sortOption}` as keyof DistrictData]);
          return (
            <District
              key={district.id}
              district={district}
              sortedAvg={sortedAvg}
              handleShowReviews={handleShowReviews}
              handleShowReviewForm={handleShowReviewForm}
            />
          );
        })}
      </Paper>
    </Paper>
  );
}

export default DistrictList;
