import { useEffect, useState } from "react";
import Pagination from "../Elements/Pagination";
import { Link } from "react-router-dom";

import data from "../data.json";

import { AccountType } from "../App";

type SortType =
  | "id"
  | "email"
  | "auth"
  | "date"
  | "idB"
  | "emailB"
  | "authB"
  | "dateB";

// formated data for date
const formatedData = data.map((account) => ({
  ...account,
  creationDate: new Date(account.creationDate),
}));

// auto sort formated data
formatedData.sort(function (a, b) {
  return b.accountId - a.accountId;
});

const Main = () => {
  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<AccountType[]>(formatedData);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pagesCount = Math.ceil(sortedData.length / 5);

  // use effect for sorting and searching
  useEffect(() => {
    let sortData = formatedData;
    // switch case for sorting
    switch (sortBy) {
      case "idB": {
        sortData = sortData.sort(function (a, b) {
          return a.accountId - b.accountId;
        });
        console.log("idB");
        break;
      }
      case "emailB": {
        sortData = sortData.sort((a, b) => b.email.localeCompare(a.email));
        console.log("emailB");
        break;
      }
      case "authB": {
        sortData = sortData.sort((a, b) =>
          b.authToken.localeCompare(a.authToken)
        );
        console.log("authB");
        break;
      }
      case "dateB": {
        sortData = sortData.sort(function (a, b) {
          return b.creationDate.getDate() - a.creationDate.getDate();
        });
        console.log("dateB");
        break;
      }
      case "id": {
        sortData = sortData.sort(function (a, b) {
          return b.accountId - a.accountId;
        });
        console.log("id");
        break;
      }
      case "email": {
        sortData = sortData.sort((a, b) => a.email.localeCompare(b.email));
        console.log("email");
        break;
      }
      case "auth": {
        sortData = sortData.sort((a, b) =>
          a.authToken.localeCompare(b.authToken)
        );
        console.log("auth");
        break;
      }
      case "date": {
        sortData = sortData.sort(function (a, b) {
          return a.creationDate.getDate() - b.creationDate.getDate();
        });
        console.log("date");
        break;
      }
    }

    // searching code
    sortData = sortData.filter(
      (account) =>
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(account.accountId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        account.authToken.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.creationDate
          .toDateString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setSortedData(sortData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchTerm, page]);

  const handleChangeSort = (sort: SortType) => {
    if (sortBy === sort) {
      setSortBy((sort + "B") as SortType); // for creating backward sorting
    } else {
      setSortBy(sort);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="ms-2"
      style={
        sortBy!.includes("B")
          ? { width: "24px", transform: "rotate(180deg)" }
          : { width: "24px" }
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </svg>
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="container w-50-sm text-center">
        <thead>
          <tr className="row fw-bold py-1">
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("id")}
            >
              AccountId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("email")}
            >
              Email
              {sortBy.includes("email") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("auth")}
            >
              AuthToken
              {sortBy.includes("auth") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("date")}
            >
              CreationDate
              {sortBy.includes("date") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData!.slice((page - 1) * 5, page * 5).map((account, index) => (
            <Link to={`/${account.accountId}`} key={index}>
              <tr className="row align-items-center">
                <td className="col py-1">{account.accountId}</td>
                <td className="col py-1">{account.email}</td>
                <td className="col py-1">{account.authToken}</td>
                <td className="col py-1">
                  {account.creationDate!.toDateString()}
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={pagesCount}
        onPageChange={setPage}
      />
    </>
  );
};

export default Main;
