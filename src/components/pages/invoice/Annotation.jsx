import { useEffect, useState } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Input from "./Input";
import { style } from "./Style";
import invoice from "./assets/invoice_1.jpg";
import invoiceData from "./assets/invoice_1.json";
import { Box } from "@mui/material";
import { Height, WidthFull } from "@mui/icons-material";
import React from 'react';

function Annotation({parentRef = React.createRef()}) {

  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [openedData, setOpenedData] = useState({});
  const [width,setWidth]=useState()
  const [height,setHeight]= useState()
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const onResize = () => {
    setPageSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onSelect = (selectedId) => {
    setId(selectedId);
    data.map((d) => {
      if (d.id === id) {
        console.log(d);
        setOpenedData(d);
      }
    });
  };
  const onChange = (data) => {
    console.log(data.value, data.label);
    console.log(data);
  };

  const conversion = (invoiceData) => {
    const convertedData = [];
    console.log(invoiceData);
    invoiceData.map((data) => {
      if (data.value && data.label) {
        const dataObject = {
          id: Math.random(),
          mark: {
            type: "RECT",
            width: Math.abs(data.rect.x2 - data.rect.x1),
            height: Math.abs(data.rect.y2 - data.rect.y1),
            x: Math.min(data.rect.x1, data.rect.x2),
            y: Math.min(data.rect.y1, data.rect.y2),
          },
          label: data.label,
          value: data.value,
        };
        convertedData.push(dataObject);
      }
      return;
    });
    setData(convertedData);
    console.log(data);
  };

  useEffect(() => {
    conversion(invoiceData.words);
  }, []);

  console.log(pageSize);

  // useEffect(()=>{
  //   const parentElement = parentRef.current;  
  //   console.log(parentElement);
  //   console.log(parentElement.offsetHeight, parentElement.offsetWidth)
  //   setWidth(parentElement.offsetWidth)
  //   setHeight(parentElement.offsetHeight)
  //   console.log(width,height)
  // },[])

  return (
    <>
    <ReactPictureAnnotation
          // image="http://192.168.2.48:8000/users/images/images.png"
          image={invoice}
          onSelect={onSelect}
          onChange={onChange}
          marginWithInput={0}
          // width="100%"
          // height="100%"
          // width={996}
          // height={996}
          width={pageSize.width}
          height={pageSize.height}
          //   width={1366}
          //   height={768}
          // width={1000}
          // height={1000}
          // width={window.outerWidth}
          // height={window.outerWidth}
          annotationStyle={style}
          annotationData={data}
          scrollSpeed={0}
          inputElement={() => {
            return (
              <>
                <Input
                  id={id}
                  data={openedData}
                  //   onchange={onchange}
                />
              </>
            );
          }}
        />
    </>
    // <div>
    //   {/* <div style={{ height: 800, width: 1000 }}> */}
    //   <Box sx={{
    //     width:"100%",
    //     height:"100%",
    //     margin:'0',
    //     padding:'0'
    //   }}
    //   ref={parentRef}
    //   >
        
    //   </Box>
    //   {/* </div> */}
    // </div>
  );
}

export default Annotation;
