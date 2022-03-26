import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJobIdAction } from "../redux/actions/jobActions";
function JobCard({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    _id: id,
    company,
    position,
    jobLocation,
    jobType,
    status,
    createdAt,
  } = job;

  const editJob = () => {
    dispatch(setJobIdAction(id));
    navigate("/add-job");
  };

  const deleteJob = () => {
    console.log(id);
  };

  return (
    <Card className="p-5">
      <div className="flex items-start ">
        <Avatar className="!rounded-md" alt="company">
          {company[0].toUpperCase()}
        </Avatar>
        <div className="ml-10">
          <h5 className="m-0">{position}</h5>
          <p className="m-0">{company}</p>
        </div>
      </div>
      <hr />

      <CardContent className="flex items-center justify-between">
        <div>
          <p className="m-0 flex items-center">
            <LocationOnIcon className="text-gray-400 mr-2" />
            {jobLocation}
          </p>
          <p className="m-0 flex items-center">
            <WorkIcon className="text-gray-400 mr-2" />
            {jobType}
          </p>
        </div>
        <div>
          <p className="m-0 flex items-center">
            <DateRangeIcon className="text-gray-400 mr-2" />
            {new Date(createdAt).toDateString()}
          </p>
          <Button
            className={`${
              status === "interview"
                ? "!bg-purple-400"
                : status === "declined"
                ? "!bg-red-400"
                : "!bg-yellow-200"
            } !text-black font-bold`}
            size="small"
          >
            {status}
          </Button>
        </div>
      </CardContent>

      <CardActions>
        <Button onClick={editJob} variant="contained" size="medium">
          Edit
        </Button>
        <Button
          onClick={deleteJob}
          color="error"
          variant="contained"
          size="medium"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
