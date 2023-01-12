import React, { useEffect, useState } from "react";
import Axios from "axios";
const PostData = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //   useEffect(() => {
  //     Axios.get("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => {
  //         console.log("Data getting from api", res.data);
  //         setData(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  const postData = (e) => {
    e.preventDefault();
    Axios.post("https://jsonplaceholder.typicode.com/posts", {
      title,
      body,
    })
      .then((res) => console.log("data posted successfully", res))
      .catch((err) => console.log(err));
  };

  const Arr = data.map((i, index) => {
    return (
      <tr>
        <td style={{ border: "1px solid grey" }}>{i.id}</td>
        <td style={{ border: "1px solid grey" }}>{i.title} </td>
        <td style={{ border: "1px solid grey" }}>{i.body} </td>
      </tr>
    );
  });
  return (
    <div className="App">
      <form>
        <lable>Title</lable>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr />
        <lable>Body</lable>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <hr />
        <button onClick={postData}>Submit</button>
      </form>
      <table>
        <tr>
          <th style={{ border: "1px solid grey" }}>Company</th>
          <th style={{ border: "1px solid grey" }}>Contact</th>
          <th style={{ border: "1px solid grey" }}>Country</th>
        </tr>
        {Arr}
      </table>
    </div>
  );
};
export default PostData;
