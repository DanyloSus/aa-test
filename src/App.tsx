import { Outlet } from "react-router-dom";

export type CampaignType = {
  campaignId: number;
  clicks: number;
  cost: number;
  date: Date;
};

export type ProfileType = {
  profileId: number;
  country: string;
  marketplace: string;
};

export type AccountType = {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: Date;
};

const App = () => {
  return (
    <div className="d-flex vw-100 vh-100 align-items-center justify-content-center flex-column">
      <Outlet />
    </div>
  );
};

export default App;
