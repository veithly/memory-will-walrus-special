module memory_will_registry::registry {
    use sui::event;

    /// On-chain receipt for one scoped Memory Will.
    ///
    /// The object stores only hashes and Walrus identifiers. The private Memory
    /// Will payload remains in Walrus and behind the app's redaction policy.
    public struct MemoryWillAnchor has key, store {
        id: sui::object::UID,
        will_id: vector<u8>,
        walrus_blob_id: vector<u8>,
        walrus_object_id: vector<u8>,
        checkpoint_hash: vector<u8>,
        policy_hash: vector<u8>,
        redaction_hash: vector<u8>,
        successor_role: vector<u8>,
        version: u64,
    }

    public struct AnchorCreated has copy, drop {
        anchor_id: sui::object::ID,
        owner: address,
        will_id: vector<u8>,
        walrus_blob_id: vector<u8>,
        walrus_object_id: vector<u8>,
        successor_role: vector<u8>,
        version: u64,
    }

    public entry fun create_anchor(
        will_id: vector<u8>,
        walrus_blob_id: vector<u8>,
        walrus_object_id: vector<u8>,
        checkpoint_hash: vector<u8>,
        policy_hash: vector<u8>,
        redaction_hash: vector<u8>,
        successor_role: vector<u8>,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let anchor = MemoryWillAnchor {
            id: sui::object::new(ctx),
            will_id,
            walrus_blob_id,
            walrus_object_id,
            checkpoint_hash,
            policy_hash,
            redaction_hash,
            successor_role,
            version: 1,
        };
        let anchor_id = sui::object::uid_to_inner(&anchor.id);
        let owner = sui::tx_context::sender(ctx);

        event::emit(AnchorCreated {
            anchor_id,
            owner,
            will_id: copy anchor.will_id,
            walrus_blob_id: copy anchor.walrus_blob_id,
            walrus_object_id: copy anchor.walrus_object_id,
            successor_role: copy anchor.successor_role,
            version: anchor.version,
        });

        sui::transfer::public_transfer(anchor, owner);
    }
}
