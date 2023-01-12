import React, { useEffect, useState } from "react";
import Axios from "axios";
const GetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("Data getting from api", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Arr = () =>
    data.map((i, index) => {
      return (
        <tr key={index}>
          <td>{i.id}</td>
          <td>{i.title} </td>
          <td>{i.body} </td>
        </tr>
      );
    });
  return (
    <div className="App">
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        {/* {Arr} */}
        <Arr />
      </table>
    </div>
  );
};
export default GetData;
