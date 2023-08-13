import React, { useEffect, useState } from "react";
import ExportToCSV from "../components/ExportToCSV";
import Home from "../home/home";
import UserService from "../services/Auth/UserService";

const DataListPage = () => {
  const [allUser, setUser] = useState([]);

  useEffect(() => {
    UserService.list().then((res) => {
    setUser(res.data.data)
    });
  }, []);
  
  return (
    <Home>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav"></div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h2 className="my-4" style={{ fontVariant: "small-caps" }}>
                <span className="shadow py-1 px-4 rounded-bottom">
                  Users List
                </span>
              </h2>
              <div className="card mb-4">
                <div className="d-flex align-items-center py-3 px-3 row">
                  <div className="col-4">
                    <ExportToCSV listData={allUser} />
                  </div>
                </div>
                <div className="card-body ">
                  <div id="datatablesSimple" className="w-100 border ">
                    <div className="">
                      <div className=" row border-bottom g-0">
                        <div className=" col-2 border-end py-2 fw-bold">
                          User Id
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Name
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Email
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Gender
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">Create Time</div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Status
                        </div>
                      </div>
                    </div>

                    {allUser.length > 0 ? (
                      <div className="tableBody">
                        {allUser?.map((item, id) => (
                          <div className=" border-bottom row g-0" key={id}>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.id}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.name}
                            </div>
                            <div className="col-2 py-2   border-end d-flex align-items-center justify-content-center">
                              {item.email}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.gender}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {new Date(item.created_at).toLocaleString()}
                            </div>

                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h3 className="mt-4 mb-4">No Data Found</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Home>
  );
};

export default DataListPage;
