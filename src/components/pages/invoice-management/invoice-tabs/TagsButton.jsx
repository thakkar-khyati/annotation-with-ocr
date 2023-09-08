import React, { useEffect, useState } from "react";
import {
  Box,
  createFilterOptions,
  TextField,
  Popover,
  Button,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { classes } from "./utils";
import axios from "axios";
import TagSelection from "../allinvoice/TagSelection";
import { tag } from "./options";

const TagsButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tagdata, setTagdata] = useState([]);
  // const [createTagValue, setCreateTagValue] = useState("");

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInputValue(" ");
    // setCreateTagValue("");
  };
  const open = Boolean(anchorEl);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // const filter = createFilterOptions();

  const getTag = (event) => {
    // setInputValue(event.target.value);
    // // console.log(inputValue);
    // setTagdata(inputValue)
    const data = {
      id: Math.random().toString(36).substr(2, 9),
      tag: inputValue,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/Tag", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // setTagdata([...tag, response.data]);
        console.log(response?.data);
        // setTagdata(response?.data);
        setInputValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Tag")
      .then((res) => {
        setTagdata(res.data);
        //  console.log(res.data)
      })
      .catch((err) => {
        // toast.error("Failed: " + err.message);
        console.log(err);
      });
  }, []);

  // const handleCreateClick = () => {
  //   if (inputValue.trim() !== "") {
  //     //   dispatch(addTag({ title: inputValue, checked: false }));
  //     setInputValue("");
  //   }
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);

  return (
    <>
      <Box>
        <Button onClick={handleClick} className={classes.TagButton}>
          Tag
          <KeyboardArrowDownIcon />
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          // sx={{ height: "41vh" }}
        >
          <Box
            className={classes.PopoverBox}
            sx={{
              // padding: "10px",
              padding:{xxl:"10px", xl:"7px", lg:"6px", md:"5px", sm:"5px", xs:"5px"}
            }}
          >
            <Autocomplete
              //  freeSolo
              sx={{
                // width: "17.81vw",
                width:{xxl:"13vw", xl:"12vw", lg:"14vw", md:"13.5vw", sm:" 13vh", xs:"15vh"}
              }}
              multiple
              id="checkboxes-tags-demo"
              // options={tag}
              options={tagdata}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              disableCloseOnSelect
              freeSolo
              // getOptionLabel={(option) => option.title}
              getOptionLabel={(option) => option.tag}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox sx={{ marginRight: 1 }} checked={selected} />
                  {option.tag}
                </li>
              )}
              renderInput={(params) => (
                <Box>
                  <TextField
                    {...params}
                    placeholder="Search Tags"
                    size="small"
                    // sx={{
                    //   "& .MuiOutlinedInput-root": {
                    //     height: {
                    //       xxl:"40px",
                    //       xl: "30px",
                    //       lg: "20px",
                    //       md: "10px",
                    //       sm: "10px",
                    //       xs: "10px",
                    //     },
                    //   },
                    // }}
                  />
                  {inputValue &&
                    !tagdata.some(
                      (option) =>
                        option.tag.toLowerCase() === inputValue.toLowerCase()
                    ) && (
                      <Button
                        onClick={getTag}
                        variant="contained"
                        // className={classes.CreateTagButton}
                        sx={{
                          // width: "17.81vw",
                          width:{xxl:"13vw", xl:"12vw", lg:"14vw", md:"13.5vw", sm:" 13vh", xs:"15vh"},
                          // width:{xxl:"342px", xl:"330px", lg:"320px", md:"310px", sm:"280px", xs:"270px"},
                          // height: "7vh",
                          // height:{xxl:"4vh", xl:"4vh", lg:"5.5vh", md:"6vh", sm:" 5vh", xs:"4vh"},
                          height:{xxl:"40px", xl:"40px", lg:"35px", md:"34px", sm:" 40px", xs:"36px"},
                          marginTop: "10px",
                          backgroundColor: "rgba(30, 30, 30, 0.1)",
                          color: "rgba(43, 43, 43, 0.8)",
                          ":hover": {
                            backgroundColor: "rgba(30, 30, 30, 0.1)",
                            color: "rgba(43, 43, 43, 0.8)",
                          },
                        }}
                      >
                        <AddIcon sx={{ marginRight: "1vw" }} />
                        Create "{inputValue}"
                      </Button>
                    )}
                </Box>
              )}
              // renderTags={(value, getTagProps) => (
              //   <div>
              //     {value.map((option, index) => (
              //       <div key={option.tag} {...getTagProps({ index })}>
              //         {option.tag}
              //       </div>
              //     ))}
              //     {inputValue && !tag.some((option) => option.tag.toLowerCase() === inputValue.toLowerCase()) && (
              //       <Button onClick={getTag} variant="contained" >
              //         Create Tag "{inputValue}"
              //       </Button>
              //     )}
              //   </div>
              // )}
              // renderInput={(params) => (
              //   <TextField
              //     {...params}
              //     // label="Search Tags"
              //     placeholder="Search Tags"
              //     variant="outlined"
              //     autoFocus
              //     InputProps={{
              //       ...params.InputProps,
              //       endAdornment: (
              //         <>
              //           {inputValue && !tag.some((option) => option.tag.toLowerCase() === inputValue.toLowerCase()) && (
              //             <Button onClick={getTag} color="primary">
              //               Create Tag "{inputValue}"
              //             </Button>
              //           )}
              //           {params.InputProps.endAdornment}
              //         </>
              //       ),
              //     }}
              //   />
              // )}
            />
            {/* {inputValue &&
              !tag.some(
                (option) =>
                  option.tag.toLowerCase() === inputValue.toLowerCase()
              ) && (
                <Button onClick={getTag} color="primary">
                  Create Tag "{inputValue}"
                </Button>
              )} */}
            {/* <Button
              variant="contained"
              onClick={getTag}
              sx={{
                width: "21vw",
                height: "15vh",
                marginTop: "5vh",
                backgroundColor: "rgba(30, 30, 30, 0.1)",
                color: "rgba(43, 43, 43, 0.8)",
                ":hover": {
                  backgroundColor: "rgba(30, 30, 30, 0.1)",
                  color: "rgba(43, 43, 43, 0.8)",
                },
              }}
            >
              {`Create ${inputValue}`}
            </Button> */}
            {/* {inputValue &&
              !tag.some(
                (option) =>
                  option.tag.toLowerCase() === inputValue.toLowerCase()
              ) && (
                <Button
                  onClick={() => {
                    setCreateTagValue(inputValue);
                    getTag();
                  }}
                  variant="contained"
                  sx={{
                    width: "21vw",
                    height: "15vh",
                    marginTop: "5vh",
                    backgroundColor: "rgba(30, 30, 30, 0.1)",
                    color: "rgba(43, 43, 43, 0.8)",
                    ":hover": {
                      backgroundColor: "rgba(30, 30, 30, 0.1)",
                      color: "rgba(43, 43, 43, 0.8)",
                    },
                  }}
                >
                  {`Create ${inputValue}`}
                </Button>
              )} */}
          </Box>
        </Popover>
      </Box>
      {/* <Root> */}
      {/* <Button
        variant="text"
        onClick={handleClick}
        className={classes.TagButton}
      >
        Tags
        <KeyboardArrowDownIcon />
      </Button> */}
      {/* <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      > */}
      {/* <TagSelection /> */}
      {/* <Box
          // className={classes.PopOverBox}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "18vw",
          }}
        >
          <TextField
            autoFocus
            placeholder="Search tags"
            variant="outlined"
            margin="normal"
            name="tag"
            value={inputValue}
            onChange={handleInputChange}
          />
          {tag.map((tag) => (
            <Box
              key={tag.id}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  padding: "0.5rem",
                  height: "100%",
                  width: "100%",
                  marginBottom: "1vh",
                  backgroundColor: "rgba(30, 30, 30, 0.1)",
                }}
              >
                {tag.tag}
              </Typography>
            </Box>
          ))}
          {tag.length > 0 || inputValue ? (
            <Button
              disabled={!inputValue}
              onClick={getTag}
              variant="contained"
              startIcon={<AddIcon />}
              // className={classes.CreatePopOverButton}
              sx={{
                backgroundColor: "rgba(30, 30, 30, 0.1)",
                color: "rgba(43, 43, 43, 0.8)",
                ":hover": {
                  backgroundColor: "rgba(30, 30, 30, 0.1)",
                  color: "rgba(43, 43, 43, 0.8)",
                },
                padding: "1vh 0vw",
              }}
            >
              {`Create ${inputValue}`}
            </Button>
          ) : (
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: "rgba(0, 0, 0, 0.60)",
                padding: "1vh 0vw",
              }}
            >
              Type to create tag..{" "}
            </Typography>
          )}
        </Box> */}
      {/* </Popover> */}
      {/* </Root> */}
    </>
  );
};

export default TagsButton;
