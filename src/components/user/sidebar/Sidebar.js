import ListOfDMs from "./ListOfDMs";
import { FaRegEdit } from "react-icons/fa";

export default function Sidebar({
  requiredHeaders,
  setSelectedUserEmail,
  setSelectedUserId,
}) {
  const handleNewMessageClicked = () => {
    setSelectedUserEmail("New Message");
    setSelectedUserId("");
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sidebar</h2>{" "}
        {/*<--------changed "Sidebar" to an appropriate title*/}
        <div className="button-new-message" onClick={handleNewMessageClicked}>
          <FaRegEdit />
        </div>
      </div>
      <div>
        <ListOfDMs
          requiredHeaders={requiredHeaders}
          setSelectedUserEmail={setSelectedUserEmail}
          setSelectedUserId={setSelectedUserId}
        />
      </div>
    </div>
  );
}
