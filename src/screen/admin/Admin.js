import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import SideNav from "./side-nav";
import { AdminContainer } from "./AdminComponent";
import { OverviewBudget } from "./overview-budget";
// OverView에 필요한 거 -> 고객, 리뷰, 문의, 주문
const Admin = () => {
  return (
    <AdminContainer>
      <SideNav />
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={3} sm={1} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AdminContainer>
  );
};

export default Admin;
