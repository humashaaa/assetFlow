const Package = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-5">Packages We Offer</h1>
      <h2 className="text-xl font-bold mb-5 ">
        Choose the Perfect Plan for Your Business
      </h2>
      <p className="text-gray-500">
        At AssetFlow, we offer flexible packages tailored to meet the needs of
        businesses of all sizes. Select the plan that best fits your team and
        start managing your assets more efficiently today!
      </p>
      {/* for flex */}
      <div className="flex items-center justify-around mt-24">
        {/* single card */}
        <div className="card w-96 bg-base-100 shadow-xl shadow-blue-500">
          <div className="card-body text-center">
            <h2 className="font-bold text-blue-600 text-xl text-center">
              Starter Plan
            </h2>
            <ul>
              <li>
                Maximum <span className="font-bold">5 Employees</span>
              </li>
              <li>
                Price: <span className="font-bold">$5/month</span>
              </li>
            </ul>
            <p>
              Ideal for small businesses and startups looking to streamline
              their asset management processes.
            </p>
          </div>
        </div>
        {/* 2nd card */}
        <div className="card w-96 bg-base-100 shadow-xl shadow-blue-500">
          <div className="card-body text-center">
            <h2 className="font-bold text-blue-600 text-xl text-center">
            Growth Plan
            </h2>
            <ul>
              <li>
                Maximum <span className="font-bold">10 Employees</span>
              </li>
              <li>
                Price: <span className="font-bold">$8/month</span>
              </li>
            </ul>
            <p>
            Perfect for growing businesses that need a bit more capacity and flexibility in managing their assets.
            </p>
          </div>
        </div>
        {/* 3rd */}

        <div className="card w-96 bg-base-100 shadow-xl shadow-blue-500">
          <div className="card-body text-center">
            <h2 className="font-bold text-blue-600 text-xl text-center">
            Enterprise Plan
            </h2>
            <ul>
              <li>
                Maximum <span className="font-bold">20 Employees</span>
              </li>
              <li>
                Price: <span className="font-bold">$15/month</span>
              </li>
            </ul>
            <p>
            Best suited for larger teams and enterprises requiring comprehensive asset management solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
