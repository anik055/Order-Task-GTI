import React, { useState } from 'react'
import './index.css'
import QRCode from 'react-qr-code';
import axios from 'axios';

 const ApiCall = ({
   method,
   url,
   payload,
   params,
   setData,
   setError,
   callback,
 }) => {
   axios({
     method: method,
     url: url,
     data: payload,
     params: params,
   })
     .then((res) => {
       setData(res);
       callback && callback(res.data);
       setError("");
     })
     .catch((error) => {
       setData("");
       // callback && callback(res.data);
       setError(error);
     });
 };

export default function Item() {
    const [item, setItem] = useState('')
    const [amount, setAmount] = useState(0)
    const [tableData, setTableData] = useState([]);
    const [QRLink, setQRLink] = useState("");
    const [link, setLink] = useState("");
    const [responseData, setResponseData] = useState("");
    const [error, setError] = useState("");


    const handleItem = (e) => {
        setItem(e.target.value)

    }
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }
    const handleEdit = (index) => {
        setItem(tableData[index].item);
        setAmount(tableData[index].amount);
        let restData = tableData.filter((item, idx) => index !== idx)
        setTableData(restData);
    };
    const handleDelete = (index) => {
        let restData = tableData.filter((item, idx) => index !== idx);
        setTableData(restData);
    };
    const createQRLink = (index) => {
    ApiCall({
      method: "POST",
      url: "https://dummyjson.com/products/add",
      payload: {
        title: "BMW Pencil",
      },
      params: undefined,
      setData: setResponseData,
      callback: (res) => {
        console.log(res);
        if (res) {
          setQRLink(res?.id)
        }
      },
      setError: setError,
    });
    };
    const createLink = (index) => {
    ApiCall({
      method: "POST",
      url: "https://dummyjson.com/products/add",
      payload: {
        title: "BMW Pencil",
      },
      params: undefined,
      setData: setResponseData,
      callback: (res) => {
        console.log(res);
        if (res) {
          setLink(res?.id);
        }
      },
      setError: setError,
    });
    };

    const handleAdd = () => {
        setTableData((prev) => {
            return [...prev, {
                item: item,
                amount: amount
            }]
        })
        setAmount('')
        setItem("");
    };




  return (
    <>
      <div>
        <button onClick={() => handleAdd()}>Add</button>
        <input
          onChange={(e) => handleItem(e)}
          type="text"
          placeholder="Item Description"
          value={item}
        />
        <input

          onChange={(e) => handleAmount(e)}
          type="number"
          placeholder="SAR"
          value={amount}
        />
      </div>

      <div className="tableData">
        <table>
          <tr>
            <th>Action</th>
            <th>description</th>
            <th>SAR</th>
          </tr>
          {tableData?.map((item, index) => (
            <tr>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
              <td>{item?.item}</td>
              <td>{item?.amount}</td>
            </tr>
          ))}
        </table>
      </div>

      {!(QRLink || link) && (
        <>
          <div>
            <p>
              Total:{" "}
              {tableData.reduce((acc, curr) => acc + Number(curr.amount), 0)}
            </p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button onClick={() => createQRLink()}>QR</button>
            <button onClick={() => createLink()}>Link</button>
          </div>
        </>
      )}

      {QRLink && (
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
                      width: "100%",
            margin: '5px auto',
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`https://nur.ragmna.com/${QRLink}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
      {link && (
        <button
          onClick={(ev) => {
            ev?.stopPropagation();
            navigator.clipboard.writeText(link);
            alert("link copied");
          }}
          type=""
        >
          Copy link
        </button>
      )}
    </>
  );
}
