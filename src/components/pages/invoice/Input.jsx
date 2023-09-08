import { Box } from "@mui/material";

function Input({ id, data }) {
  const placeholder = "INPUT TAG HERE";
  console.log(id, data);
  return (
    <>
      <Box sx={{
        width:'277px',
        height:'142px',
        background:'#FFFFFF',
      }} >
        <Box sx={{
          height:'80px',
          width:'120px'
        }} >
          <label>{data.label}</label>
        </Box>
        <Box sx={{
          borderColor:'#DECDFF',
          border:'1px',
          borderRadius:'6px',
          height:'80px',
          width:'120px'
        }}>
          <input value={data.value}></input>
        </Box>
        <Box sx={{
          height:'117px',
          width:'120px',
          background:"black"
        }} ></Box>
      </Box>
    </>
  );
}

export default Input;
