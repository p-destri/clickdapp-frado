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

    const now = Date.toString();

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
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ title: e.target.value }),
            value: state.title,
            placeholder: "Name",
            name: "title",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ description: e.target.value }),
            value: state.description,
            placeholder: "Description",
            name: "description",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ discount: e.target.value }),
            value: state.discount,
            placeholder: "Discount",
            name: "discount",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ access: e.target.value }),
            value: state.access,
            placeholder: "Access",
            name: "access",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ events: e.target.value }),
            value: state.access,
            placeholder: "Events",
            name: "events",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ receiver_id: e.target.value }),
            value: state.receiver_id,
            placeholder: "Wallet",
            name: "receiver_id",
        })}
        {renderPlasmicElement("input", {
            type: "text",
            onChange: (e) => State.update({ expires_at: e.target.value }),
            value: state.receiver_id,
            placeholder: "Expire",
            name: "expires_at",
        })}
        {renderPlasmicElement("input", {
            type: "url",
            onChange: (e) => State.update({ media: e.target.value }),
            value: state.media,
            placeholder: "Artwork",
            name: "media",
        })}
        {renderPlasmicElement("button", {
            type: "submit",
            onClick: registerNft,
            value: "Submit",
            placeholder: "Submit",
            name: "media",
        })}
    </div>
);