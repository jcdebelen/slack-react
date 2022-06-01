import ListOfDMs from "./ListOfDMs";

export default function Sidebar({requiredHeaders}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sidebar</h2>     {/*<--------changed "Sidebar" to an appropriate title*/}
        <button>New</button> {/*<--------change to an icon(New Message) {FaRegEdit} from react-icons/fa  */}
      </div>
      <div>
        <ListOfDMs requiredHeaders={requiredHeaders} />
      </div>
    </div>
  );
}
