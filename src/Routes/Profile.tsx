import { useEffect, useState } from "react";
import data from "../data.json";
import Pagination from "../Elements/Pagination";
import { CampaignType } from "../App";
import { useParams } from "react-router-dom";

type SortType =
  | "id"
  | "clicks"
  | "cost"
  | "date"
  | "idB"
  | "clicksB"
  | "costB"
  | "dateB";

const Account = () => {
  const param = useParams();

  const accountIndex = data.findIndex(
    (account) => account.accountId === Number(param.accountID)
  );

  const profileIndex = data[accountIndex].profiles.findIndex(
    (profile) => profile.profileId === Number(param.profileID)
  );

  const profileData = data[accountIndex].profiles[profileIndex].campaigns;

  const formatedData = profileData.map((profile) => ({
    ...profile,
    date: new Date(profile.date),
  }));

  console.log(formatedData);

  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<CampaignType[]>(formatedData);
  const [page, setPage] = useState(1);

  const pagesCount = Math.ceil(formatedData.length / 5);

  useEffect(() => {
    let sortData;
    switch (sortBy) {
      case "id": {
        sortData = formatedData.sort((a, b) => a.campaignId - b.campaignId);
        console.log("id");
        break;
      }
      case "clicks": {
        sortData = formatedData.sort((a, b) => a.clicks - b.clicks);
        console.log("clicks");
        break;
      }
      case "cost": {
        sortData = formatedData.sort((a, b) => a.cost - b.cost);
        console.log("auth");
        break;
      }
      case "date": {
        sortData = formatedData.sort(
          (a, b) => a.date.getDate() - b.date.getDate()
        );
        console.log("date");
        break;
      }
      case "idB": {
        sortData = formatedData.sort((a, b) => b.campaignId - a.campaignId);
        console.log("idB");
        break;
      }
      case "clicksB": {
        sortData = formatedData.sort((a, b) => b.clicks - a.clicks);
        console.log("emailB");
        break;
      }
      case "costB": {
        sortData = formatedData.sort((a, b) => b.cost - a.cost);
        console.log("authB");
        break;
      }
      case "dateB": {
        sortData = formatedData.sort(
          (a, b) => b.date.getDate() - a.date.getDate()
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
      {" "}
      <h3>
        {data[accountIndex].profiles[profileIndex].marketplace}'s campaigns
      </h3>
      <table className="container w-50-sm text-center">
        <thead>
          <tr className="row fw-bold py-1">
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("id")}
            >
              CampaignId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("clicks")}
            >
              Clicks
              {sortBy.includes("clicks") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("cost")}
            >
              Cost
              {sortBy.includes("cost") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("date")}
            >
              Date
              {sortBy.includes("date") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData!.slice((page - 1) * 5, page * 5).map((profile, index) => (
            <tr className="row align-items-center py-1 " key={index}>
              <td className="col">{profile.campaignId}</td>
              <td className="col">{profile.clicks}</td>
              <td className="col">{profile.cost}</td>
              <td className="col">{profile.date.toDateString()}</td>
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

export default Account;
