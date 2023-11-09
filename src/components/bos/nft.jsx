State.init({
  receiver_id: "",
  title: "",
  description: "",
  media: "",
  expires_at: "",
  access: "",
  events: "",
});

const accountId = context.accountId;

const registerNft = () => {
  if (!accountId) {
    return;
  }

  const { receiver_id, title, description, media, expires_at, access, events } =
    State;

  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 300000000000000; // 300 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 400000000000000000000;

  const now = Date.toISOString();

  Near.call([
    {
      contractName: "fradao.testnet",
      methodName: "nft_mint",
      args: {
        token_id: title + receiver_id,
        receiver_id,
        token_metadata: {
          title, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
          description, // free-form description
          media, // URL to associated media, preferably to decentralized, content-addressed storage
          issued_at: now, // ISO 8601 datetime when token was issued or minted
          expires_at, // ISO 8601 datetime when token expires
          starts_at: now, // ISO 8601 datetime when token starts being valid
          extra: {
            access,
            events,
          }, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const handleChange = (e) => {
  State.update({ [e.target.name]: e.target.value });
};

return (
  <div>
    <input
      type="text"
      placeholder="Name"
      name="title"
      value={state.title}
      onChange={(e) => State.update({ title: e.target.value })}
    ></input>
    <input
      type="text"
      placeholder="Description"
      name="description"
      value={state.description}
      onChange={(e) => State.update({ description: e.target.value })}
    ></input>
    <input
      type="text"
      placeholder="Discount"
      name="discount"
      value={state.discount}
      onChange={(e) => State.update({ discount: e.target.value })}
    ></input>
    <input
      type="text"
      placeholder="Access"
      name="access"
      value={state.access}
      onChange={(e) => State.update({ access: e.target.value })}
    ></input>
    <input
      type="text"
      placeholder="Events"
      name="events"
      value={state.events}
      onChange={(e) => State.update({ events: e.target.value })}
    ></input>
    <input
      type="text"
      placeholder="Wallet"
      name="receiver_id"
      value={state.receiver_id}
      onChange={(e) => State.update({ receiver_id: e.target.value })}
    ></input>
    <input
      type="date"
      placeholder="Expire"
      name="expires_at"
      value={state.expires_at}
      onChange={(e) => State.update({ expires_at: e.target.value })}
    ></input>
    <input
      type="url"
      placeholder="Artwork"
      name="media"
      value={state.media}
      onChange={(e) => State.update({ media: e.target.value })}
    ></input>
    <button
      type="submit"
      placeholder="Submit"
      value="Submit"
      onClick={registerNft}
    >Submit</button>
  </div>
);
