import React from "react";
import { useState, useEffect } from "react";

export default function ListOfChannels({ requiredHeaders }) {
  let [newChannel, setNewChannel] = useState("");
  let [modal, setModal] = useState(false);
  let [members, setMembers] = useState([]);
  let [member, setMember] = useState("");
  let [ids, setIds] = useState([]);
  let [channels, setChannels] = useState([]);

  var myHeaders = new Headers();

  var requestGet = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  myHeaders.append("access-token", requiredHeaders.accessToken);
  myHeaders.append("client", requiredHeaders.clientToken);
  myHeaders.append("expiry", requiredHeaders.expiry);
  myHeaders.append("uid", requiredHeaders.uid);
  myHeaders.append("Content-Type", "Application/json");

  let createChannel = (newChannel, ids) => {
    let data = {
      name: newChannel,
      user_ids: ids,
    };

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://206.189.91.54//api/v1/channels", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));

    getChannels();
  };

  let addMember = (newMember) => {
    fetch("http://206.189.91.54//api/v1/users", requestGet)
      .then((response) => response.text())
      .then((result) => {
        let parse = JSON.parse(result).data;
        let find = parse.find((email) => {
          return email.uid === member;
        });

        if (find !== undefined) {
          let id = find.id;
          let same = members.find((email) => {
            return email === find.uid;
          });
          if (same === find.uid) {
            console.log("user already added");
          } else {
            setMembers((prevData) => {
              return [newMember, ...prevData];
            });
            setIds((prevData) => {
              return [id, ...prevData];
            });
          }
        } else console.log("no user");
      })
      .catch((error) => console.log("error", error));
  };

  // show channels
  const getChannels = () => {
    fetch("http://206.189.91.54//api/v1/channels", requestGet)
      .then((response) => response.text())
      .then((result) => {
        let parse = JSON.parse(result).data;
        let channels = parse.map((data) => {
          return { name: data.name, id: data.id };
        });
        setChannels(channels);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getChannels();
  }, []);

  let MyChannels = () => {
    return channels.map((channels, index) => (
      <div className="channel-con" key={index}>
        <button className="channel-name">{channels.name}</button>
      </div>
    ));
  };

  return (
    <>
      <h4 id="channel-title">Channels</h4>
      <MyChannels />
      {modal ? (
        <div>
          <div className="c-sk-overlay">
            <div
              className="ReactModal__Content ReactModal__Content--after-open c-sk-modal c-sk-modal--fixed p-channel_create_modal"
              tabIndex="-1"
            >
              <div className="c-sk-modal_header">
                <div className="c-sk-modal_title_bar c-sk-modal_title_bar--pad_right p-channel_create_modal__header">
                  <h1>Create a channel</h1>
                </div>
              </div>
              <div className="c-sk-modal_content p-channel_create_modal__content">
                <div
                  role="presentation"
                  className="c-scrollbar c-scrollbar--hidden c-scrollbar--inherit_size"
                >
                  <div className="c-scrollbar__hider">
                    <div className="c-scrollbar__child">
                      <div className="c-sk-modal_content__inner">
                        <div className="c-sk-modal_content_section">
                          <div className="sk_dark_gray margin_bottom_150">
                            Channels are where your team communicates. They’re
                            best when organized around a topic — #marketing, for
                            example.
                          </div>
                          <div>
                            <label>
                              <span className="p-channel_name_input__label_title">
                                <strong>Add Members</strong>
                              </span>
                            </label>
                            <div className="p-channel_name_input__input">
                              <div
                                className="c-search-select"
                                data-qa="channel-name"
                              >
                                <div className="c-select_input__wrapper c-select_input--large c-select_input--with_icon_left p-channel_name_input__select_input_wrapper">
                                  <div className="c-select_input__input_container p-channel_name_input__select_input_container">
                                    <div data-qa-formtext="true">
                                      <div className="c-input_text_icon c-input_text_icon--large">
                                        <div
                                          role="presentation"
                                          className="c-input_character_count c-input_character_count--large"
                                          data-qa="input_character_count"
                                        >
                                          <form
                                            className="flexx"
                                            onSubmit={(e) => {
                                              e.preventDefault();
                                              addMember(member);
                                            }}
                                          >
                                            <input
                                              className="c-input_text c-input_text--large c-input_text--with_icon c-select_input p-channel_name_input__select_input"
                                              placeholder="email"
                                              type="email"
                                              value={member}
                                              onChange={(e) =>
                                                setMember(e.target.value)
                                              }
                                            />
                                            <button
                                              type="submit"
                                              className="c-button c-button--primary c-button--medium"
                                            >
                                              add
                                            </button>
                                          </form>
                                          <div className="flexx">
                                            {members.map((email, index) => (
                                              <p
                                                key={index}
                                                className="members"
                                              >
                                                <p className="boxx">{email},</p>
                                              </p>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="c-select_input__icon_container"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label>
                              <span className="p-channel_name_input__label_title">
                                <strong>Name</strong>
                              </span>
                              <span
                                className="p-channel_name_input__label_error"
                                data-qa="channel_name_error"
                                role="alert"
                              ></span>
                            </label>
                            <div className="p-channel_name_input__input">
                              <div
                                className="c-search-select"
                                data-qa="channel-name"
                              >
                                <div
                                  role="presentation"
                                  className="c-select_input__wrapper c-select_input--large c-select_input--with_icon_left p-channel_name_input__select_input_wrapper"
                                >
                                  <div className="c-select_input__input_container p-channel_name_input__select_input_container">
                                    <div data-qa-formtext="true">
                                      <div className="c-input_text_icon c-input_text_icon--large">
                                        <div
                                          role="presentation"
                                          className="c-input_character_count c-input_character_count--large"
                                          data-qa="input_character_count"
                                        >
                                          <form
                                            onSubmit={(e) => {
                                              e.preventDefault();
                                              createChannel(newChannel, ids);
                                            }}
                                          >
                                            <input
                                              className="c-input_text c-input_text--large c-input_text--with_icon c-select_input p-channel_name_input__select_input"
                                              placeholder="e.g. plan-budget"
                                              type="text"
                                              value={newChannel}
                                              onChange={(e) =>
                                                setNewChannel(e.target.value)
                                              }
                                            />
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="c-select_input__icon_container"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-sk-modal_footer p-channel_create_modal__footer p-channel_create_modal__footer--paid_feature_badge">
                <div className="c-sk-modal_footer_actions">
                  <button
                    className="c-button c-button--primary c-button--medium c-button--disabled"
                    type="button"
                  >
                    Create
                  </button>
                </div>
              </div>
              <button
                className="c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-sk-modal__close_button"
                type="button"
                onClick={() => setModal(false)}
              >
                <span>&#10006;</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button className="" onClick={() => setModal(true)}>
            {" "}
            Create Channel
          </button>
        </>
      )}
    </>
  );
}
