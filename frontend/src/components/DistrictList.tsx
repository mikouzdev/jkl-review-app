import District, { type DistrictData } from "./District";
import { type SelectedDistrict } from "../context/SelectedDistrictContext";
import { useSelectedDistrict } from "../context/SelectedDistrictContext";
import {
  Select,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  CircularProgress,
  Box,
  type SelectChangeEvent,
} from "@mui/material";

interface Props {
  showReviewForm: () => void;
  districts: DistrictData[];
  sortOption: string;
  setSortOption: (sort: string) => void;
  isLoading: boolean;
}

function DistrictList({ showReviewForm, districts, sortOption, setSortOption, isLoading }: Props) {
  const { selectedDistrict, setSelectedDistrict } = useSelectedDistrict();

  function handleSort(e: SelectChangeEvent<string>) {
    if (sortOption === e.target.value) return;
    setSortOption(e.target.value);
  }

  function handleShowReviewForm(district: SelectedDistrict) {
    showReviewForm();
    if (selectedDistrict?.id === district.id) return;
    setSelectedDistrict(district);
  }

  function handleShowReviews(district: SelectedDistrict) {
    if (selectedDistrict?.id === district.id) return;
    setSelectedDistrict(district);
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
        minWidth: 350,
        maxHeight: "100%",
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1,
          overflowY: "scroll",
          maxHeight: "100%",
          width: "100%",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, width: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Paper>
    </Paper>
  );
}

export default DistrictList;
