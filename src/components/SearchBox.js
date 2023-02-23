// import React from "react";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import React, { useState, useEffect } from "react";

import { SearchIcon } from "../assets/index";
const SearchBox = ({ new_user, setOpen }) => {

  const [search_add, set_search_add] = useState("");

  return (
    <div className="search-box flex items-center">
      <div className="icon">
        <SearchIcon />
      </div>
      <input
            type="text"
            className="txt cleanbtn w-full"
            placeholder="Search Member By Address"
            value={search_add}
            onChange={(e) => {
              set_search_add(e.target.value);
            }}
          />
      <button className="btn button"             
      onClick={() => {
              // setOpen(false);
              new_user(search_add);
            }}
          >Search</button>
    </div>
  );
};

export default SearchBox;
