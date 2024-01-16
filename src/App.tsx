import React, { useEffect, useState } from "react";
import data from "./data.json";

type CampaignType = {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
};

type ProfileType = {
  profileId: number;
  country: string;
  marketplace: string;
  campaigns?: CampaignType[];
};

type AccountType = {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: Date;
  profiles?: ProfileType[];
};

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

const App = () => {
  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<AccountType[]>(formatedData);

  useEffect(() => {
    let sortData;
    switch (sortBy) {
      case "id": {
        sortData = formatedData.sort((a, b) => b.accountId - a.accountId);
        break;
      }
      case "email": {
        sortData = formatedData.sort((a, b) => b.email.localeCompare(a.email));
        break;
      }
      case "auth": {
        sortData = formatedData.sort((a, b) =>
          b.authToken.localeCompare(a.authToken)
        );
        break;
      }
      case "date": {
        sortData = formatedData.sort(
          (a, b) => b.creationDate.getDate() - a.creationDate.getDate()
        );
        break;
      }
      case "idB": {
        sortData = formatedData.sort((a, b) => a.accountId - b.accountId);
        break;
      }
      case "emailB": {
        sortData = formatedData.sort((a, b) => a.email.localeCompare(b.email));
        break;
      }
      case "authB": {
        sortData = formatedData.sort((a, b) =>
          a.authToken.localeCompare(b.authToken)
        );
        break;
      }
      case "dateB": {
        sortData = formatedData.sort(
          (a, b) => a.creationDate.getDate() - b.creationDate.getDate()
        );
        break;
      }
    }
    setSortedData(sortData);
  }, [sortBy]);

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
    <div className="d-flex vw-100 vh-100 align-items-center justify-content-center">
      <table className="container w-50-sm text-center">
        <thead>
          <tr className="row fw-bold">
            <th
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("id")}
            >
              AccountId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("email")}
            >
              Email
              {sortBy.includes("email") && arrow}
            </th>
            <th
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("auth")}
            >
              AuthToken
              {sortBy.includes("auth") && arrow}
            </th>
            <th
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("date")}
            >
              CreationDate
              {sortBy.includes("date") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((account) => (
            <tr
              className="row align-items-center py-1 "
              key={account.accountId}
            >
              <td className="col">{account.accountId}</td>
              <td className="col">{account.email}</td>
              <td className="col">{account.authToken}</td>
              <td className="col">{account.creationDate.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
