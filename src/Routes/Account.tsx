import { useEffect, useState } from "react";
import data from "../data.json";
import Pagination from "../Elements/Pagination";
import { ProfileType } from "../App";
import { useParams } from "react-router-dom";

type SortType = "id" | "country" | "market" | "idB" | "countryB" | "marketB";

const Account = () => {
  const param = useParams();

  const accountIndex = data.findIndex(
    (account) => account.accountId === Number(param.accountID)
  );

  const formatedData = data[accountIndex].profiles;

  console.log(formatedData);

  const [sortBy, setSortBy] = useState<SortType>("id");
  const [sortedData, setSortedData] = useState<ProfileType[]>(formatedData);
  const [page, setPage] = useState(1);

  const pagesCount = Math.ceil(formatedData.length / 5);

  useEffect(() => {
    let sortData;
    switch (sortBy) {
      case "id": {
        sortData = formatedData.sort((a, b) => a.profileId - b.profileId);
        console.log("id");
        break;
      }
      case "country": {
        sortData = formatedData.sort((a, b) =>
          b.country.localeCompare(a.country)
        );
        console.log("country");
        break;
      }
      case "market": {
        sortData = formatedData.sort((a, b) =>
          b.marketplace.localeCompare(a.marketplace)
        );
        console.log("auth");
        break;
      }
      case "idB": {
        sortData = formatedData.sort((a, b) => b.profileId - a.profileId);
        console.log("idB");
        break;
      }
      case "countryB": {
        sortData = formatedData.sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        console.log("emailB");
        break;
      }
      case "marketB": {
        sortData = formatedData.sort((a, b) =>
          a.marketplace.localeCompare(b.marketplace)
        );
        console.log("authB");
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
              ProfileId
              {sortBy.includes("id") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("country")}
            >
              Country
              {sortBy.includes("country") && arrow}
            </th>
            <th
              role="button"
              className="col d-flex align-items-center justify-content-center"
              onClick={() => handleChangeSort("market")}
            >
              Marketplace
              {sortBy.includes("market") && arrow}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData!.slice((page - 1) * 5, page * 5).map((account, index) => (
            <tr className="row align-items-center py-1 " key={index}>
              <td className="col">{account.profileId}</td>
              <td className="col">{account.country}</td>
              <td className="col">{account.marketplace}</td>
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
