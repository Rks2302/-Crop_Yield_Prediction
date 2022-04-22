import React, { useState } from "react";
import axios from "axios";

function Predict(props) {
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState({
    district: "",
    crop: "",
    season: "",
    area: 0,
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(input);
    const url = `http://127.0.0.1:5000/${props.route}`;
    const data = {
      district_input: input.district,
      crop_input: input.crop,
      area_input: input.area,
      season_input: input.season,
    };
    axios
      .post(url, data)
      .then(({ data }) => {
        console.log(data.prediction);
        localStorage.setItem(`${props.route}`, JSON.stringify(data));
        setToggle(true);
      })
      .catch((err) => {});
  }

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <div className="login">
        {!toggle ? (
          <div className="container form ">
            <form className="form-group" onSubmit={handleSubmit}>
              {props.route == "seasonwise" ? (
                <h1>Already Decided Your Crop </h1>
              ) : (
                <h1>Decide Your Crop First</h1>
              )}
              <hr></hr>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <label for="district">Enter District</label>
                </div>
                <input
                  type="text"
                  className="select"
                  name="district"
                  placeholder="District Name"
                  onChange={handleChange}
                ></input>

                {props.route == "seasonwise" ? (
                  <div>
                    <label for="crop">Choose Crop</label>
                  </div>
                ) : (
                  ""
                )}
                {props.route == "seasonwise" ? (
                  <select
                    id="crop"
                    name="crop"
                    className="select"
                    onChange={handleChange}
                  >
                    <option value="none" selected disabled hidden>
                      Select Crop
                    </option>
                    <option value="Arecanut">Arecanut</option>
                    <option value="Other Kharif pulses">
                      Other Kharif pulses
                    </option>
                    <option value="Rice">Rice</option>
                    <option value="Banana">Banana</option>
                    <option value="Cashewnut">Cashewnut</option>
                    <option value="Coconut">Coconut</option>
                    <option value="Dry ginger">Dry ginger</option>
                    <option value="other oilseeds">other oilseeds</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Sweet potato">Sweet potato</option>
                    <option value="Tapioca">Tapioca</option>
                    <option value="Black pepper">Black pepper</option>
                    <option value="Dry chillies">Dry chillies</option>
                    <option value="Turmeric">Turmeric</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                    <option value="Rice">Rice</option>
                  </select>
                ) : (
                  ""
                )}
                {props.route == "cropwise" ? (
                  <div>
                    <label for="season">Choose Season</label>
                  </div>
                ) : (
                  ""
                )}
                {props.route == "cropwise" ? (
                  <select
                    id="season"
                    name="season"
                    className="select"
                    onChange={handleChange}
                  >
                    <option value="none" selected disabled hidden>
                      Select Season{" "}
                    </option>
                    <option value="Rabi">Rabi</option>
                    <option value="Kharif">Kharif</option>
                    <option value="Whole Year">Whole Year</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Summer">Summer</option>
                    <option value="KhariWinterf">Winter</option>
                  </select>
                ) : (
                  ""
                )}

                <div>
                  <label for="season">Enter Area</label>
                </div>
                <input
                  type="text"
                  placeholder="Area (in Hectatres)"
                  name="area"
                  onChange={handleChange}
                  className="select "
                ></input>
              </div>
              {props.route == "cropwise" ? (
                <button type="submit">Get Crops</button>
              ) : (
                <button type="submit">Predict</button>
              )}
            </form>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div
              style={{
                display: "flex",
                width: "70%",
                justifyContent: "space-around",
                flexWrap: "wrap",
                marginTop: "3%",
                color: "#fff",
                background: "#0c500d",
              }}
            >
              {props.route == "seasonwise" ? (
              <h1>Crop : {input.crop}</h1>
              ) : (
                <h1>Season : {input.season}</h1>
              )}
              <h1>District : {input.district}</h1>
              
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {JSON.parse(localStorage.getItem(`${props.route}`))
                .prediction[0] == undefined ? (
                <div
                  style={{
                    border: "2px solid #fff",
                    marginTop: "10%",
                    width: "auto",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <h1
                    style={{
                      padding: " 10px 20px",
                      height: "100%",
                      paddingBottom: "5px",
                      background: "red",
                    }}
                  >
                    Data Not Available
                  </h1>
                </div>
              ) : (
                JSON.parse(
                  localStorage.getItem(`${props.route}`)
                ).prediction.map((key, value) => {
                  return (
                    <div
                      style={{
                        border: "2px solid #fff",
                        marginTop: "10%",
                        width: "auto",
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      <div style={{}}>
                        <h1
                          style={{
                            padding: " 10px 20px",
                            borderBottom: "1px solid #fff",
                            paddingBottom: "5px",
                            marginBottom: "20px",
                            background: "#0c500d",
                          }}
                        >
                          {Object.keys(key)[0]}
                        </h1>
                      </div>
                      <div
                        style={{
                          padding: "20px",
                        }}
                      >
                        <h5>
                          Area : <span className="span">{input.area}</span> hect
                        </h5>
                        <h5>
                          Yield :{" "}
                          <span className="span">
                            {Math.round(
                              (Object.values(key)[0] + Number.EPSILON) * 100
                            ) / 100}
                          </span>{" "}
                          ton/hect
                        </h5>
                        <h5>
                          Production :{" "}
                          <span className="span">
                            {Math.round(
                              (input.area * Object.values(key)[0] +
                                Number.EPSILON) *
                                100
                            ) / 100}
                          </span>{" "}
                          tonnes
                        </h5>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
