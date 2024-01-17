import { useEffect, useState } from "react";
import Pagination from "../Elements/Pagination";
import { Link, useParams } from "react-router-dom";

import { ProfileType } from "../App";

import data from "../data.json";

type SortType = "id" | "country" | "market" | "idB" | "countryB" | "marketB";

const Account = () => {
  const param = useParams();

  // get index of account from params
  const accountIndex = data.findIndex(
    (account) => account.accountId === Number(param.accountID)
  );

  // profile data
  const profileData = data[accountIndex].profiles;

  // auto sort profile data
  profileData.sort((a, b) => b.profileId - a.profileId);

  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<ProfileType[]>(profileData);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pagesCount = Math.ceil(sortedData.length / 5);

  // use effect for sorting and searching
  useEffect(() => {
    let sortData;
    // switch case for sorting
    switch (sortBy) {
      case "idB": {
        sortData = profileData.sort((a, b) => a.profileId - b.profileId);
        console.log("idB");
        break;
      }
      case "countryB": {
        sortData = profileData.sort((a, b) =>
          b.country.localeCompare(a.country)
        );
        console.log("countryB");
        break;
      }
      case "marketB": {
        sortData = profileData.sort((a, b) =>
          b.marketplace.localeCompare(a.marketplace)
        );
        console.log("marketB");
        break;
      }
      case "id": {
        sortData = profileData.sort((a, b) => b.profileId - a.profileId);
        console.log("id");
        break;
      }
      case "country": {
        sortData = profileData.sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        console.log("country");
        break;
      }
      case "market": {
        sortData = profileData.sort((a, b) =>
          a.marketplace.localeCompare(b.marketplace)
        );
        console.log("market");
        break;
      }
    }

    // searching code
    sortData = sortData.filter(
      (account) =>
        account.marketplace.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(account.profileId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        account.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSortedData(sortData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, page, searchTerm]);

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

  return sortedData.length || searchTerm ? (
    <>
      <h3>{data[accountIndex].email}'s profiles</h3>
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
              ProfileId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("country")}
            >
              Country
              {sortBy.includes("country") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center py-1"
              onClick={() => handleChangeSort("market")}
            >
              Marketplace
              {sortBy.includes("market") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData!.slice((page - 1) * 5, page * 5).map((profile, index) => (
            <Link to={`/${param.accountID}/${profile.profileId}`} key={index}>
              <tr className="row align-items-center">
                <td className="col py-1">{profile.profileId}</td>
                <td className="col py-1">{profile.country}</td>
                <td className="col py-1">{profile.marketplace}</td>
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
      <Link to="/">Back</Link>
    </>
  ) : (
    <>
      <h3>{data[accountIndex].email} doesn't have any profiles</h3>
      <Link to="/">Back</Link>
    </>
  );
};

export default Account;
