import {Link} from 'react-router-dom';
function Home() {
  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-9 col-xxl-12">
            <div className="row">
              <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                <div className="card overflow-hidden">
                  <div className="card-body pb-0 px-4 pt-4">
                    <div className="row">
                      <div className="col">
                        <h5 className="mb-1">2000</h5>
                        <span className="text-success">Total Sale</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-wrapper">
                    <canvas
                      id="areaChart_2"
                      className="chartjs-render-monitor"
                      height="90"
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                <div className="card bg-success	overflow-hidden">
                  <div className="card-body pb-0 px-4 pt-4">
                    <div className="row">
                      <div className="col">
                        <h5 className="text-white mb-1">$14000</h5>
                        <span className="text-white">Total Eraning</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-wrapper" style={{ width: "100%" }}>
                    <span className="peity-line" data-width="100%">
                      6,2,8,4,3,8,4,3,6,5,9,2
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                <div className="card bg-primary overflow-hidden">
                  <div className="card-body pb-0 px-4 pt-4">
                    <div className="row">
                      <div className="col text-white">
                        <h5 className="text-white mb-1">570</h5>
                        <span>VIEWS OF YOUR PROJECT</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-wrapper px-2">
                    <canvas id="chart_widget_2" height="100"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                <div className="card overflow-hidden">
                  <div className="card-body px-4 py-4">
                    <h5 className="mb-3">
                      1700 /<small className="text-primary">Sales Status</small>
                    </h5>
                    <div className="chart-point">
                      <div className="check-point-area">
                        <canvas id="ShareProfit2"></canvas>
                      </div>
                      <ul className="chart-point-list">
                        <li>
                          <i className="fa fa-circle text-primary mr-1"></i> 40%
                          Tickets
                        </li>
                        <li>
                          <i className="fa fa-circle text-success mr-1"></i> 35%
                          Events
                        </li>
                        <li>
                          <i className="fa fa-circle text-warning mr-1"></i> 25%
                          Other
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-4 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Timeline</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="DZ_W_TimeLine1"
                      className="widget-timeline dz-scroll style-1"
                      style={{ height: "250px" }}
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-badge primary"></div>
                          <Link className="timeline-panel text-muted" to="/">
                            <span>10 minutes ago</span>
                            <h6 className="mb-0">
                              Youtube, a video-sharing website
                              <strong className="text-primary">$500</strong>.
                            </h6>
                          </Link>
                        </li>
                        <li>
                          <div className="timeline-badge info"></div>
                          <Link className="timeline-panel text-muted" to="/">
                            <span>20 minutes ago</span>
                            <h6 className="mb-0">
                              New order placed
                              <strong className="text-info">#XF-2356.</strong>
                            </h6>
                            <p className="mb-0">
                              Quisque a consequat ante Sit...
                            </p>
                          </Link>
                        </li>
                        <li>
                          <div className="timeline-badge danger"></div>
                          <Link className="timeline-panel text-muted" to="/">
                            <span>30 minutes ago</span>
                            <h6 className="mb-0">
                              john just buy your product
                              <strong className="text-warning">
                                Sell $250
                              </strong>
                            </h6>
                          </Link>
                        </li>
                        <li>
                          <div className="timeline-badge success"></div>
                          <Link className="timeline-panel text-muted" to="/">
                            <span>15 minutes ago</span>
                            <h6 className="mb-0">
                              StumbleUpon is acquired by eBay.
                            </h6>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-xxl-8 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Recent Payments Queue</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-responsive-sm mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: "20px" }}>
                              <div className="custom-control custom-checkbox checkbox-primary check-lg mr-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkAll"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  for="checkAll"
                                ></label>
                              </div>
                            </th>
                            <th>
                              <strong>STATUS.</strong>
                            </th>
                            <th>
                              <strong>NAME</strong>
                            </th>
                            <th>
                              <strong>DATE</strong>
                            </th>
                            <th>
                              <strong>STATUS</strong>
                            </th>
                            <th style={{ width: "85px" }}>
                              <strong>EDIT</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox check-lg mr-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheckBox2"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheckBox2"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <b>$542</b>
                            </td>
                            <td>Dr. Jackson</td>
                            <td>01 August 2020</td>
                            <td className="recent-stats d-flex align-items-center">
                              <i className="fa fa-circle text-success mr-1"></i>
                              Successful
                            </td>
                            <td>
                              <Link
                                to="/"
                                className="btn btn-primary shadow btn-xs sharp mr-1"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>
                              <Link
                                to="/"
                                className="btn btn-danger shadow btn-xs sharp"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox check-lg mr-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheckBox3"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheckBox3"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <b>$2000</b>
                            </td>
                            <td>Dr. Jackson</td>
                            <td>01 August 2020</td>
                            <td className="recent-stats d-flex align-items-center">
                              <i className="fa fa-circle text-danger mr-1"></i>
                              Canceled
                            </td>
                            <td>
                              <Link
                                to="/"
                                className="btn btn-primary shadow btn-xs sharp mr-1"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>
                              <Link
                                to="/"
                                className="btn btn-danger shadow btn-xs sharp"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox check-lg mr-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheckBox4"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheckBox4"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <b>$300</b>
                            </td>
                            <td>Dr. Jackson</td>
                            <td>01 August 2020</td>
                            <td className="recent-stats d-flex align-items-center">
                              <i className="fa fa-circle text-warning mr-1"></i>
                              Pending
                            </td>
                            <td>
                              <Link
                                to="/"
                                className="btn btn-primary shadow btn-xs sharp mr-1"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>
                              <Link
                                to="/"
                                className="btn btn-danger shadow btn-xs sharp"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="custom-control custom-checkbox check-lg mr-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheckBox5"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  for="customCheckBox5"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <b>$2000</b>
                            </td>
                            <td>Dr. Jackson</td>
                            <td>01 August 2020</td>
                            <td className="recent-stats d-flex align-items-center">
                              <i className="fa fa-circle text-danger mr-1"></i>
                              Canceled
                            </td>
                            <td>
                              <Link
                                to="/"
                                className="btn btn-primary shadow btn-xs sharp mr-1"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-pencil"></i>
                              </Link>
                              <Link
                                to="/"
                                className="btn btn-danger shadow btn-xs sharp"
                                style={{ color: "white" }}
                              >
                                <i className="fa fa-trash"></i>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-xxl-4 col-lg-12 col-md-12">
            <div className="card bg-primary text-white">
              <div className="card-header pb-0 border-0">
                <h4 className="card-title text-white">TOP PRODUCTS</h4>
              </div>
              <div className="card-body">
                <div className="widget-media">
                  <ul className="timeline">
                    <li>
                      <div className="timeline-panel">
                        <div className="media mr-2">
                          <img
                            alt="Avatar"
                            width="50"
                            src="images/avatar/1.jpg"
                          />
                        </div>
                        <div className="media-body">
                          <h5 className="mb-1 text-white">
                            Dr Sultads Send You
                          </h5>
                          <small className="d-block">
                            29 July 2020 - 02:26 PM
                          </small>
                        </div>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-primary light sharp"
                            data-toggle="dropdown"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/">
                              Edit
                            </Link>
                            <Link className="dropdown-item" to="/">
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media mr-2 media-info">KG</div>
                        <div className="media-body">
                          <h5 className="mb-1 text-white">Resport created</h5>
                          <small className="d-block">
                            29 July 2020 - 02:26 PM
                          </small>
                        </div>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-info light sharp"
                            data-toggle="dropdown"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/">
                              Edit
                            </Link>
                            <Link className="dropdown-item" to="/">
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media mr-2 media-success">
                          <i className="fa fa-home"></i>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-1 text-white">
                            Reminder : Treatment
                          </h5>
                          <small className="d-block">
                            29 July 2020 - 02:26 PM
                          </small>
                        </div>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-success light sharp"
                            data-toggle="dropdown"
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="19" cy="12" r="2" />
                              </g>
                            </svg>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/">
                              Edit
                            </Link>
                            <Link className="dropdown-item" to="/">
                              Delete
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <canvas id="lineChart_3Kk"></canvas>
            </div>

            <div className="col-lg-12 col-sm-12">
              <div className="card bg-primary">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Dual Line Chart</h4>
                </div>
                <div className="card-body"></div>
                <canvas id="lineChart_3Kk"></canvas>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6">
            <div className="card bg-info activity_overview">
              <div className="card-header  border-0 pb-3 ">
                <h4 className="card-title text-white">Activity</h4>
              </div>
              <div className="card-body pt-0">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs mb-2">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        data-toggle="tab"
                        href="#sale"
                      >
                        Sale
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        data-toggle="tab"
                        href="#overview"
                      >
                        Overview
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="sale">
                      <canvas id="chart_widget_4"></canvas>
                    </div>
                    <div
                      className="tab-pane fade "
                      id="overview"
                      role="tabpanel"
                    >
                      <div className="pt-4 text-white">
                        <h4 className="text-white">This is home title</h4>
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts. Separated they live in Bookmarksgrove.
                        </p>
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts. Separated they live in Bookmarksgrove.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6">
            <div className="card active_users">
              <div className="card-header bg-success border-0 pb-0">
                <h4 className="card-title text-white">Active Users</h4>
              </div>
              <div className="bg-success">
                <canvas id="activeUser" height="200"></canvas>
              </div>
              <div className="card-body pt-0">
                <div className="list-group-flush mt-4">
                  <div
                    className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0"
                    style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
                  >
                    <p className="mb-0">Top Active Pages</p>
                    <p className="mb-0">Active Users</p>
                  </div>
                  <div
                    className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                    style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <p className="mb-0">/bootstrap-themes/</p>
                    <p className="mb-0">3</p>
                  </div>
                  <div
                    className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                    style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <p className="mb-0">/tags/html5/</p>
                    <p className="mb-0">3</p>
                  </div>
                  <div
                    className="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none"
                    style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <p className="mb-0">/</p>
                    <p className="mb-0">2</p>
                  </div>
                  <div
                    className="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none"
                    style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <p className="mb-0">/preview/falcon/dashboard/</p>
                    <p className="mb-0">2</p>
                  </div>
                  <div
                    className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                    style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <p className="mb-0">/100-best-themes...all-time/</p>
                    <p className="mb-0">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-xxl-12 col-lg-12 col-md-12">
            <div id="user-activity" className="card">
              <div className="card-header border-0 pb-0 d-sm-flex d-block">
                <div>
                  <h4 className="card-title">History 2013 - 2020</h4>
                  <p className="mb-1">
                    Lorem Ipsum is simply dummy text of the printing
                  </p>
                </div>
                <div className="card-action">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        data-toggle="tab"
                        href="#user"
                        role="tab"
                      >
                        Day
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-toggle="tab"
                        href="#session"
                        role="tab"
                      >
                        Week
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-toggle="tab"
                        href="#bounce"
                        role="tab"
                      >
                        Month
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-toggle="tab"
                        href="#session-duration"
                        role="tab"
                      >
                        Year
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="user"
                    role="tabpanel"
                  >
                    <canvas id="activity" className="chartjs"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
