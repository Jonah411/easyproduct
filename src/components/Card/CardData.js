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

const CardData = ({
  data,
  address,
  dataId,
  count,
  handleViewClick,
  roll,
  moduleName,
}) => {
  return (
    <Card sx={{ position: "relative" }}>
      {!moduleName && (
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
            borderRadius: "12px", // More rounded corners
            boxShadow: 2, // Subtle shadow for depth
          }}
        >
          <Typography variant="body2" sx={{ color: "red", fontWeight: "bold" }}>
            {dataId}
          </Typography>
        </Box>
      )}

      {count ? (
        <Box
          sx={{
            position: "absolute",
            top: 2,
            left: 2,
            backgroundColor: "#87CEEB",
            padding: "4px 8px",
            borderRadius: "12px",
            boxShadow: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "grey", fontWeight: "bold" }}
          >
            {count ? count : ""}
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          mb={2}
        >
          <Avatar
            alt={data?.userImage}
            src={`${BASE_URL}/image/${data?.userImage}`}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-center"
        >
          {data.name}
        </Typography>
        <Box
          sx={{
            height: "15vh",
            overflow: "auto",
          }}
        >
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
      {!moduleName && (
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
      )}
    </Card>
  );
};

export default CardData;
