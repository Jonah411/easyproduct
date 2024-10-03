import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardData from "../Card/CardData";

const PositionList = ({ PositionList }) => {
  return (
    <div className="card mb-2">
      <div className="card-header">
        {" "}
        <h5 className="fw-bold">Organization Leaders</h5>
      </div>
      <div className="card-body">
        {PositionList?.map((li) => {
          return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <Accordion className="m-2">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {li?.pName} - {li?.positionId}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="row">
                    {li?.pMember?.map((data) => {
                      return (
                        <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                          <CardData
                            data={data}
                            address={data?.userAddress}
                            title={"User"}
                            dataId={li?.positionId}
                            count={data?.memberCount}
                            roll={data.Roll?.rName}
                            moduleName="position"
                            // handleViewClick={handleViewClick}
                          />
                        </div>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PositionList;
