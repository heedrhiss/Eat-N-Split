import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <FriendList />
      <SplitBill />
    </div>
  );
}

function FriendList() {
  const [friendList, setFriendList] = useState(initialFriends);

  function handleNewFriend(newFriend) {
    setFriendList([...friendList, newFriend]);
  }

  return (
    <div className="sidebar">
      <ul>
        {friendList.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
      <AddFriend handleNewFriend={handleNewFriend} />
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li className="">
      <img src={friend.image} alt={friend.name} />
      <h2>{friend.name}</h2>
      {friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes u ${friend.balance}
        </p>
      ) : friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function Button({ event, children }) {
  return (
    <button className="button" onClick={event}>
      {children}
    </button>
  );
}

function AddFriend({ handleNewFriend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    // const id = Date.now();
    const newFriend = {
      name,
      id,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    handleNewFriend(newFriend);
  }
  function handleClose() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {isOpen && (
        <form className="form-add-friend" onSubmit={handleSubmit}>
          <label>👬Friend Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>📸 Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button>Add</Button>
        </form>
      )}

      <Button event={handleClose}>{isOpen ? "Close" : "Add Friend"}</Button>
    </>
  );
}

function SplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH FRIEND</h2>
      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🕴 Your Expense</label>
      <input type="text" />

      <label>👬 Friend Expense</label>
      <input type="text" />

      <label>💳 Who is paying?</label>
      <select>
        <option value="me">Me</option>
        <option value="friend">Friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
