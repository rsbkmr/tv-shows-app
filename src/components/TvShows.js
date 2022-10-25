import { useContext } from "react";
import { TvShowsContext } from "../context/TvShows";

const TvShows = () => {
  const { tvShows, setQuery, query, loading } = useContext(TvShowsContext);

  return (
    <div className="container mt-4">
      <input
        className="form-control form-control-lg"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        defaultValue={query}
      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {tvShows.length ? (
            <div className="mt-4 row">
              {tvShows.map((tvShow) => (
                <div className="col-6 p-2" key={tvShow.show.id}>
                  <div className="card h-100 p-0">
                    <div className="row justify-content-center align-items-center h-100 g-0">
                      <div className="col-md-4">
                        <img
                          src={
                            tvShow.show?.image?.medium ||
                            tvShow.show?.image?.original ||
                            "https://via.placeholder.com/200x300?text=No+Image"
                          }
                          className="img-fluid rounded-start h-100 responsive-img"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{tvShow.show?.name}</h5>
                          <p className="card-text">
                            {tvShow.show?.summary &&
                              tvShow.show.summary.slice(0, 100)}
                            ...
                          </p>
                          <p className="card-text">
                            <small className="text-muted d-block">
                              Type: {tvShow.show?.ifdsa || "N/A"}
                            </small>
                            <small className="text-muted d-block">
                              Language: {tvShow.show?.language || "N/A"}
                            </small>
                            <small className="text-muted d-block">
                              Status: {tvShow.show?.status || "N/A"}
                            </small>
                            <small className="text-muted d-block">
                              Language: {tvShow.show?.language || "N/A"}
                            </small>
                            <small className="text-muted d-block">
                              Genres:{" "}
                              {tvShow.show?.genres?.length
                                ? tvShow.show?.genres.map(
                                    (genre) => genre + ", "
                                  )
                                : "N/A"}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 text-center">No Result</div>
          )}
        </div>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default TvShows;
