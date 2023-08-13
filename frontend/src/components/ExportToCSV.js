import React from 'react';
import { CSVLink } from "react-csv";
 


const ExportToCSV =(props) => {
  const headers = [
    { label: "User Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Time", key: "created_at" },
    { label: "Status", key: "status" }
  ];
  
  const data = [
  ];
  
  
  for (let index = 0; index < props.listData.length; index++) {
    let single_obj = {};

    single_obj.id = props.listData[index].id;
    single_obj.name = props.listData[index].name;
    single_obj.email = props.listData[index].email;
    single_obj.gender = props.listData[index].gender;
    single_obj.created_at = new Date(props.listData[index].created_at).toLocaleString()
    single_obj.status = props.listData[index].status;

    data.push(single_obj);
  }

 
const csvReport = {
  data: data,
  headers: headers,
  filename: 'User_List.csv'
};
 
  return (
    <div className='d-flex ms-4 mt-4'>
     
     <p className='mt-2'>Export to CSV</p>
      <CSVLink {...csvReport} style={{'fontSize' : '25px'}}><i className="fa-sharp fa-solid fa-file-arrow-down ms-2"></i></CSVLink>
    </div>
  );
}
 
export default ExportToCSV;