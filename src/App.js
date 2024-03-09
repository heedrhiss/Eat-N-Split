import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Heedrhiss",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 20,
  },
  {
    id: 933372,
    name: "Orochimaru",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: -7,
  },
  {
    id: 499476,
    name: "Black-Beard",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [selectFriend, setSelectFriend] = useState(null);
  const [friendList, setFriendList] = useState(initialFriends);

  function friendSelect(friend) {
    setSelectFriend((curSelect) =>
      friend.id === selectFriend?.id ? null : friend
    );
  }

  function handleBalance(value) {
    setFriendList((cur) =>
      friendList.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectFriend(null);
  }

  return (
    <div className="app">
      <FriendList
        friendList={friendList}
        setFriendList={setFriendList}
        selection={friendSelect}
        selectFriend={selectFriend}
      />
      {selectFriend && (
        <SplitBill selectFriend={selectFriend} onSplitBill={handleBalance} key={selectFriend.id} />
      )}
    </div>
  );
}

function FriendList({ friendList, setFriendList, selection, selectFriend }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNewFriend(newFriend) {
    setFriendList([...friendList, newFriend]);
    setIsOpen(false);
  }

  return (
    <div className="sidebar">
      <ul>
        {friendList.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selection={selection}
            selectFriend={selectFriend}
          />
        ))}
      </ul>
      <AddFriend
        handleNewFriend={handleNewFriend}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

function Friend({ friend, selection, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button event={() => selection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function AddFriend({ isOpen, setIsOpen, handleNewFriend }) {
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
    setName("");
    setImage("https://i.pravatar.cc/48");
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

function SplitBill({ selectFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState("");
  const [payer, setPayer] = useState("me");
  const friendBill = bill - myBill;

  function handleSplit(e) {
    e.preventDefault();
    if (!bill) return;
    const whoIsPaying = payer === "me" ? myBill : -friendBill;
    onSplitBill(whoIsPaying);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>SPLIT A BILL WITH {selectFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🕴 My Expense</label>
      <input
        type="text"
        value={myBill}
        onChange={(e) =>
          setMyBill(+e.target.value > bill ? myBill : +e.target.value)
        }
      />

      <label>👬 Friend Expense</label>
      <input type="text" disabled value={friendBill} />

      <label>💳 Who is paying?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="me">Me</option>
        <option value="friend">{selectFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
