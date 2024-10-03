import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Tooltip from "@mui/material/Tooltip";
import { BASE_URL } from "../../common/ConstaltsVariables";

const CardDataGroup = ({ data, address, dataId, roll, handleViewClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
          backgroundColor:
            roll === "admin"
              ? "#FFCDD2"
              : roll === "user"
              ? "#90EE90"
              : roll === "member"
              ? "#FFFFE0"
              : "#D3D3D3",
          padding: "4px 8px",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "red", fontWeight: "bold" }}>
          {dataId}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "55px",
            sm: "55px",
            md: "70px",
            lg: "110px",
            xl: "110px",
          },
          height: {
            xs: "55px",
            sm: "55px",
            md: "70px",
            lg: "110px",
            xl: "110px",
          },
          mr: 2,
          mx: 2,
        }}
      >
        <Avatar
          alt={data?.memberImage}
          src={`${BASE_URL}/image/${data?.memberImage}`}
          sx={{
            width: {
              xs: "50px",
              sm: "50px",
              md: "65px",
              lg: "100px",
              xl: "100px",
            },
            height: {
              xs: "50px",
              sm: "50px",
              md: "65px",
              lg: "100px",
              xl: "100px",
            },
          }}
        />
      </Box>
      {/* Right Side: Content */}
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography gutterBottom variant="h6" component="div">
            {data?.name}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ mr: 1, color: "text.secondary" }}
            fontSize="small"
          >
            Age: {data?.age} Gender: {data?.gender}
          </Typography>
          <Box sx={{ height: "8vh", overflow: "auto" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {address}
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Tooltip title={data?.email} arrow>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                    cursor: "pointer",
                  }}
                >
                  {data?.email}
                </Typography>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data?.phoneNo}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button size="small" variant="contained" color="primary">
              Update
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              sx={{ ml: 1 }}
              onClick={(e) => handleViewClick(e, data)}
            >
              View
            </Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CardDataGroup;
