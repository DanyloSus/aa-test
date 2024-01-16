import { useEffect, useState } from "react";
import data from "../data.json";
import Pagination from "../Elements/Pagination";
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

const formatedData = data.map((account) => ({
  ...account,
  creationDate: new Date(account.creationDate),
}));

const pagesCount = Math.ceil(formatedData.length / 5);

const Main = () => {
  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<AccountType[]>(formatedData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let sortData;
    switch (sortBy) {
      case "id": {
        sortData = formatedData.sort((a, b) => a.accountId - b.accountId);
        console.log("id");
        break;
      }
      case "email": {
        sortData = formatedData.sort((a, b) => b.email.localeCompare(a.email));
        console.log("email");
        break;
      }
      case "auth": {
        sortData = formatedData.sort((a, b) =>
          b.authToken.localeCompare(a.authToken)
        );
        console.log("auth");
        break;
      }
      case "date": {
        sortData = formatedData.sort(
          (a, b) => b.creationDate.getDate() - a.creationDate.getDate()
        );
        console.log("date");
        break;
      }
      case "idB": {
        sortData = formatedData.sort((a, b) => b.accountId - a.accountId);
        console.log("idB");
        break;
      }
      case "emailB": {
        sortData = formatedData.sort((a, b) => a.email.localeCompare(b.email));
        console.log("emailB");
        break;
      }
      case "authB": {
        sortData = formatedData.sort((a, b) =>
          a.authToken.localeCompare(b.authToken)
        );
        console.log("authB");
        break;
      }
      case "dateB": {
        sortData = formatedData.sort(
          (a, b) => a.creationDate.getDate() - b.creationDate.getDate()
        );
        console.log("dateB");
        break;
      }
    }
    setSortedData(sortData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, page]);

  const handleChangeSort = (sort: SortType) => {
    if (sortBy === sort) {
      setSortBy((sort + "B") as SortType);
    } else {
      setSortBy(sort);
    }
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
        sortBy.includes("B")
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
      <table className="container w-50-sm text-center">
        <thead>
          <tr className="row fw-bold py-1">
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("id")}
            >
              AccountId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("email")}
            >
              Email
              {sortBy.includes("email") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("auth")}
            >
              AuthToken
              {sortBy.includes("auth") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("date")}
            >
              CreationDate
              {sortBy.includes("date") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData!.slice((page - 1) * 5, page * 5).map((account, index) => (
            <tr className="row align-items-center py-1 " key={index}>
              <td className="col">{account.accountId}</td>
              <td className="col">{account.email}</td>
              <td className="col">{account.authToken}</td>
              <td className="col">{account.creationDate.toDateString()}</td>
            </tr>
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
