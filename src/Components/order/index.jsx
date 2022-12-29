import React, { useState } from "react";

export default function Order() {
    const [search, setSearch] = useState("");
    const orderData = [
      {
        orderId: 1,
        item: "pen",
        amount: 100,
      },
      {
        orderId: 2,
        item: "ten",
        amount: 100,
      },
      {
        orderId: 3,
        item: "den",
        amount: 100,
      },
      {
        orderId: 4,
        item: "pen",
        amount: 100,
      },
      {
        orderId: 5,
        item: "pen",
        amount: 100,
      },
    ];
    const [searchData, setSearchData] = useState(orderData);



    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearch(e.target.value);
        const regex = new RegExp(searchText?.toLowerCase());
        let newDta = orderData?.filter((item) =>
          regex.test(item?.item?.toLowerCase())
        );
        console.log(newDta);
        setSearchData(newDta);
    }
    return (
      <>
        <div>
                <input
                    style={{padding: '3px', border: '1px solid gray', borderRadius: '5px'}}
            placeholder="search order"
            onChange={(e) => handleSearch(e)}
            type="text"
            value={search}
          />
        </div>
        <div className="tableData">
          <table>
            <tr>
              <th>Action</th>
              <th>description</th>
              <th>SAR</th>
                    </tr>
                    {console.log(searchData)}
            {searchData?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item?.item}</td>
                <td>{item?.amount}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
}
